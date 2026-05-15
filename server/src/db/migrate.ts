import { getDb } from './index';

const MIGRATIONS: { name: string; sql: string }[] = [
  {
    name: '001_initial',
    sql: `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        applied_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS feedback (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open', 'in_progress', 'done', 'closed')),
        upvotes INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS votes (
        feedback_id TEXT NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
        voter_token TEXT NOT NULL,
        PRIMARY KEY (feedback_id, voter_token)
      );

      CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
      CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_votes_feedback_id ON votes(feedback_id);
    `,
  },
];

export function runMigrations(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    )
  `);

  for (const migration of MIGRATIONS) {
    const applied = db
      .prepare('SELECT filename FROM schema_migrations WHERE filename = ?')
      .get(migration.name);

    if (applied) continue;

    db.exec(migration.sql);
    db.prepare('INSERT INTO schema_migrations (filename, applied_at) VALUES (?, ?)').run(
      migration.name,
      new Date().toISOString()
    );

    console.log(`[migrate] Applied: ${migration.name}`);
  }
}
