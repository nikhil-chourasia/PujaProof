import { NextResponse } from 'next/server';
import { db, initDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await initDb();
    
    // SQL Query to retrieve all waitlist entries
    const result = await db.execute({
      sql: 'SELECT id, email, created_at FROM waitlist ORDER BY created_at DESC',
      args: []
    });

    return NextResponse.json({
      count: result.rows.length,
      waitlist: result.rows,
    });
  } catch (error) {
    console.error('SQL GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDb();

    let email = '';

    try {
      const body = await request.json();
      email = body?.email || '';
    } catch {
      try {
        const formData = await request.formData();
        email = (formData.get('email') as string) || '';
      } catch {
        const text = await request.text();
        try {
          const parsed = JSON.parse(text);
          email = parsed?.email || '';
        } catch {
          email = text.trim();
        }
      }
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // SQL Query: Check if the email already exists in the table
    const existing = await db.execute({
      sql: 'SELECT id, email FROM waitlist WHERE email = ? LIMIT 1',
      args: [cleanEmail]
    });

    if (existing.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "You're already on the waitlist!",
        isNew: false
      });
    }

    // SQL Query: Insert unique email into table
    await db.execute({
      sql: 'INSERT INTO waitlist (email) VALUES (?)',
      args: [cleanEmail]
    });

    return NextResponse.json({
      success: true,
      message: "Thanks for joining our waitlist! We'll keep you posted.",
      isNew: true
    });
  } catch (error) {
    console.error('SQL POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save waitlist entry. Please try again.' },
      { status: 500 }
    );
  }
}
