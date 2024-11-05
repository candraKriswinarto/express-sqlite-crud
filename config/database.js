// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const db = new sqlite3.Database(
  path.resolve(__dirname, '../data/database.sqlite'),
  (err) => {
    if (err) {
      console.error('Could not connect to database', err);
      throw new Error('Database connection failed');
    }
    console.log('Connected to SQLite database');
  }
);

// Create the `items` table if it doesn't exist
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error('Error creating table:', err);
        throw new Error('Table creation failed');
      }
    }
  );
});

module.exports = db;
