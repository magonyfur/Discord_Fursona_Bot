const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'fursonas.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

console.log('🔧 Setting up database...');

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    display_name TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now')),
    total_generated INTEGER DEFAULT 0,
    favorite_species TEXT,
    favorite_color TEXT,
    settings TEXT DEFAULT '{}'
  )
`);

// Fursonas table
db.exec(`
  CREATE TABLE IF NOT EXISTS fursonas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    species_rarity TEXT NOT NULL,
    age INTEGER NOT NULL,
    height_cm INTEGER NOT NULL,
    weight_kg INTEGER NOT NULL,
    base_color TEXT NOT NULL,
    secondary_color TEXT NOT NULL,
    accent_color TEXT NOT NULL,
    pattern TEXT NOT NULL,
    pattern_rarity TEXT NOT NULL,
    eye_color TEXT NOT NULL,
    personality TEXT NOT NULL,
    accessories TEXT NOT NULL,
    traits TEXT NOT NULL,
    trait_rarities TEXT NOT NULL,
    backstory TEXT NOT NULL,
    is_favorite INTEGER DEFAULT 0,
    is_public INTEGER DEFAULT 1,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
`);

// Trades table
db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    initiator_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    initiator_fursona_id INTEGER,
    target_fursona_id INTEGER,
    status TEXT DEFAULT 'pending',
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now')),
    completed_at INTEGER,
    FOREIGN KEY (initiator_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (target_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (initiator_fursona_id) REFERENCES fursonas (id) ON DELETE SET NULL,
    FOREIGN KEY (target_fursona_id) REFERENCES fursonas (id) ON DELETE SET NULL
  )
`);

// Collection stats view
db.exec(`
  CREATE VIEW IF NOT EXISTS user_stats AS
  SELECT 
    u.id as user_id,
    u.username,
    u.display_name,
    COUNT(f.id) as total_fursonas,
    COUNT(CASE WHEN f.is_favorite = 1 THEN 1 END) as favorites,
    COUNT(DISTINCT f.species) as unique_species,
    COUNT(CASE WHEN f.species_rarity = 'legendary' THEN 1 END) as legendaries,
    COUNT(CASE WHEN f.species_rarity = 'epic' THEN 1 END) as epics,
    COUNT(CASE WHEN f.species_rarity = 'rare' THEN 1 END) as rares,
    COUNT(CASE WHEN f.species_rarity = 'uncommon' THEN 1 END) as uncommons,
    COUNT(CASE WHEN f.species_rarity = 'common' THEN 1 END) as commons,
    MAX(f.created_at) as last_generated
  FROM users u
  LEFT JOIN fursonas f ON u.id = f.user_id
  GROUP BY u.id
`);

// Indexes for performance
db.exec(`CREATE INDEX IF NOT EXISTS idx_fursonas_user_id ON fursonas(user_id)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_fursonas_species ON fursonas(species)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_fursonas_created_at ON fursonas(created_at)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_trades_initiator ON trades(initiator_id)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_trades_target ON trades(target_id)`);
db.exec(`CREATE INDEX IF NOT EXISTS idx_trades_status ON trades(status)`);

console.log('✅ Database tables created successfully');
console.log(`📁 Database location: ${dbPath}`);

// Verify
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('📋 Tables:', tables.map(t => t.name).join(', '));

db.close();