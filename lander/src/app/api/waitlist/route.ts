import { NextResponse } from 'next/server';
import { db, initDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await initDb();

    // Retrieve all waitlist entries ordered from oldest to newest to assign exact positions
    const result = await db.execute({
      sql: 'SELECT id, name, email, created_at FROM waitlist ORDER BY id ASC',
      args: [],
    });

    const totalCount = result.rows.length;
    // Map with waitlist spot number (#1 is first person to register)
    const formatted = result.rows.map((row, index) => ({
      id: Number(row.id),
      name: String(row.name || ''),
      email: String(row.email || ''),
      created_at: String(row.created_at || ''),
      position: index + 1,
    }));

    // For display, return most recent signups first while preserving their true position #
    const displayList = [...formatted].reverse();

    return NextResponse.json({
      count: totalCount,
      waitlist: displayList,
    });
  } catch (error) {
    console.error('Waitlist GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDb();

    let email = '';
    let name = '';

    try {
      const body = await request.json();
      email = body?.email || '';
      name = body?.name || '';
    } catch {
      try {
        const formData = await request.formData();
        email = (formData.get('email') as string) || '';
        name = (formData.get('name') as string) || '';
      } catch {
        const text = await request.text();
        try {
          const parsed = JSON.parse(text);
          email = parsed?.email || '';
          name = parsed?.name || '';
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
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const nowIso = new Date().toISOString();

    // Check if email already exists
    const existing = await db.execute({
      sql: 'SELECT id, name, email FROM waitlist WHERE email = ? LIMIT 1',
      args: [cleanEmail],
    });

    let isNew = false;
    if (existing.rows.length > 0) {
      if (cleanName) {
        await db.execute({
          sql: 'UPDATE waitlist SET name = ? WHERE email = ?',
          args: [cleanName, cleanEmail],
        });
      }
    } else {
      isNew = true;
      await db.execute({
        sql: 'INSERT INTO waitlist (name, email, created_at) VALUES (?, ?, ?)',
        args: [cleanName, cleanEmail, nowIso],
      });
    }


    // Fetch updated waitlist
    const all = await db.execute({
      sql: 'SELECT id, name, email, created_at FROM waitlist ORDER BY id ASC',
      args: [],
    });

    const totalCount = all.rows.length;
    const formatted = all.rows.map((row, index) => ({
      id: Number(row.id),
      name: String(row.name || ''),
      email: String(row.email || ''),
      created_at: String(row.created_at || ''),
      position: index + 1,
    }));

    return NextResponse.json({
      success: true,
      message: isNew
        ? "Thanks for joining our waitlist! We'll keep you posted."
        : "You're already on the waitlist! We've updated your spot.",
      isNew,
      count: totalCount,
      waitlist: [...formatted].reverse(),
    });
  } catch (error) {
    console.error('Waitlist POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save waitlist entry. Please try again.' },
      { status: 500 }
    );
  }
}
