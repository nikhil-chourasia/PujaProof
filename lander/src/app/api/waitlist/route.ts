import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const dataDir = path.join(process.cwd(), 'data');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'waitlist.json');
    let waitlist: { email: string; createdAt: string }[] = [];

    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        waitlist = JSON.parse(fileData);
      } catch {
        waitlist = [];
      }
    }

    const alreadyExists = waitlist.some((item) => item.email === trimmedEmail);

    if (!alreadyExists) {
      waitlist.push({
        email: trimmedEmail,
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(filePath, JSON.stringify(waitlist, null, 2), 'utf-8');
    }

    return NextResponse.json({ 
      success: true, 
      message: alreadyExists ? "You're already on the waitlist!" : "Thanks for joining our waitlist!" 
    });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
