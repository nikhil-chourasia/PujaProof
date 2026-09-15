import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'waitlist.db');

export const db = createClient({
  url: `file:${dbPath.replace(/\\/g, '/')}`,
});

let isInitialized = false;

// Helper function to initialize the SQL waitlist table and migrate existing data
export async function initDb() {
  if (isInitialized) return;

  // 1. Create SQL table with UNIQUE constraint on email
  await db.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Import existing records from JSON if available
  const jsonPath = path.join(dataDir, 'waitlist.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        for (const item of list) {
          if (item?.email) {
            await db.execute({
              sql: 'INSERT OR IGNORE INTO waitlist (email, created_at) VALUES (?, ?)',
              args: [item.email.trim().toLowerCase(), item.createdAt || new Date().toISOString()]
            });
          }
        }
      }
    } catch {
      // Ignore JSON migration errors
    }
  }

  isInitialized = true;
}
