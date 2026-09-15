import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

// Resolve fallback local path only if cloud DB is not configured
const rootDir = process.cwd().endsWith('lander') ? process.cwd() : path.join(process.cwd(), 'lander');
const dataDir = path.join(rootDir, 'data');

if (!process.env.TURSO_DATABASE_URL && !process.env.DATABASE_URL) {
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // Ignore if read-only
    }
  }
}

export const dbPath = path.join(dataDir, 'waitlist.db');

// Configure client with remote Turso if available, otherwise local SQLite
const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || `file:${dbPath.replace(/\\/g, '/')}`;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

export const db = createClient({
  url: dbUrl,
  authToken: authToken,
});

let isInitialized = false;

export async function initDb() {
  if (isInitialized) return;

  try {
    // 1. Create table in the database if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT DEFAULT '',
        email TEXT UNIQUE NOT NULL,
        created_at TEXT NOT NULL
      );
    `);

    // Ensure 'name' column exists if table was created in earlier schema without name
    try {
      await db.execute(`ALTER TABLE waitlist ADD COLUMN name TEXT DEFAULT '';`);
    } catch {
      // Column already exists, ignore
    }

    isInitialized = true;
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  }
}
