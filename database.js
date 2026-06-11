const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FURSONAS_FILE = path.join(DATA_DIR, 'fursonas.json');
const TRADES_FILE = path.join(DATA_DIR, 'trades.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
function initFile(filePath, defaultContent = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

let users = initFile(USERS_FILE);
let fursonas = initFile(FURSONAS_FILE);
let trades = initFile(TRADES_FILE);

let nextFursonaId = Math.max(0, ...fursonas.map(f => f.id)) + 1;
let nextTradeId = Math.max(0, ...trades.map(t => t.id)) + 1;

function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function saveFursonas() {
  fs.writeFileSync(FURSONAS_FILE, JSON.stringify(fursonas, null, 2));
}

function saveTrades() {
  fs.writeFileSync(TRADES_FILE, JSON.stringify(trades, null, 2));
}

function getOrCreateUser(user) {
  let existing = users.find(u => u.id === user.id);
  if (existing) {
    existing.username = user.username;
    existing.display_name = user.displayName || user.globalName || user.username;
    existing.updated_at = Date.now();
    saveUsers();
    return existing;
  }
  
  existing = {
    id: user.id,
    username: user.username,
    display_name: user.displayName || user.globalName || user.username,
    created_at: Date.now(),
    updated_at: Date.now(),
    total_generated: 0,
    favorite_species: null,
    favorite_color: null,
    settings: {}
  };
  
  users.push(existing);
  saveUsers();
  return existing;
}

function saveFursona(userId, fursona) {
  const dbFursona = {
    id: nextFursonaId++,
    user_id: userId,
    name: fursona.name,
    species: fursona.species,
    species_rarity: fursona.speciesRarity || 'common',
    age: fursona.age,
    height_cm: fursona.heightCm,
    weight_kg: fursona.weightKg,
    base_color: fursona.baseColor,
    secondary_color: fursona.secondaryColor,
    accent_color: fursona.accentColor,
    pattern: fursona.pattern,
    pattern_rarity: fursona.patternRarity || 'common',
    eye_color: fursona.eyeColor,
    personality: JSON.stringify(fursona.personality),
    accessories: JSON.stringify(fursona.accessories),
    traits: JSON.stringify(fursona.traits),
    trait_rarities: JSON.stringify(fursona.traitRarities || []),
    backstory: fursona.backstory,
    is_favorite: 0,
    is_public: 1,
    created_at: Date.now(),
    updated_at: Date.now()
  };
  
  fursonas.push(dbFursona);
  saveFursonas();
  
  // Update user stats
  const user = users.find(u => u.id === userId);
  if (user) {
    user.total_generated++;
    user.updated_at = Date.now();
    saveUsers();
  }
  
  return { ...fursona, id: dbFursona.id };
}

function getFursonas(userId, limit = 500) {
  return fursonas
    .filter(f => f.user_id === userId)
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, limit)
    .map(row => ({
      ...row,
      personality: JSON.parse(row.personality || '[]'),
      accessories: JSON.parse(row.accessories || '[]'),
      traits: JSON.parse(row.traits || '[]'),
      traitRarities: JSON.parse(row.trait_rarities || '[]'),
      speciesRarity: row.species_rarity,
      patternRarity: row.pattern_rarity,
      isFavorite: Boolean(row.is_favorite),
      isPublic: Boolean(row.is_public)
    }));
}

function getStats(userId) {
  const userFursonas = fursonas.filter(f => f.user_id === userId);
  
  return {
    user_id: userId,
    total_fursonas: userFursonas.length,
    favorites: userFursonas.filter(f => f.is_favorite).length,
    unique_species: [...new Set(userFursonas.map(f => f.species))].length,
    legendaries: userFursonas.filter(f => f.species_rarity === 'legendary').length,
    epics: userFursonas.filter(f => f.species_rarity === 'epic').length,
    rares: userFursonas.filter(f => f.species_rarity === 'rare').length,
    uncommons: userFursonas.filter(f => f.species_rarity === 'uncommon').length,
    commons: userFursonas.filter(f => f.species_rarity === 'common').length,
    last_generated: userFursonas.length > 0 
      ? Math.max(...userFursonas.map(f => f.created_at)) 
      : null
  };
}

function getLeaderboard(limit = 10) {
  const userStats = users.map(user => ({
    user_id: user.id,
    username: user.username,
    display_name: user.display_name,
    total_fursonas: user.total_generated || 0,
    // These are computed on the fly
    favorites: fursonas.filter(f => f.user_id === user.id && f.is_favorite).length,
    unique_species: [...new Set(fursonas.filter(f => f.user_id === user.id).map(f => f.species))].length,
    legendaries: fursonas.filter(f => f.user_id === user.id && f.species_rarity === 'legendary').length,
    epics: fursonas.filter(f => f.user_id === user.id && f.species_rarity === 'epic').length,
    rares: fursonas.filter(f => f.user_id === user.id && f.species_rarity === 'rare').length,
    uncommons: fursonas.filter(f => f.user_id === user.id && f.species_rarity === 'uncommon').length,
    commons: fursonas.filter(f => f.user_id === user.id && f.species_rarity === 'common').length
  }));
  
  return userStats
    .filter(s => s.total_fursonas > 0)
    .sort((a, b) => b.total_fursonas - a.total_fursonas)
    .slice(0, limit);
}

function getFavoriteFursona(userId) {
  const fav = fursonas.find(f => f.user_id === userId && f.is_favorite === 1);
  if (!fav) return null;
  
  return {
    ...fav,
    personality: JSON.parse(fav.personality || '[]'),
    accessories: JSON.parse(fav.accessories || '[]'),
    traits: JSON.parse(fav.traits || '[]'),
    traitRarities: JSON.parse(fav.trait_rarities || '[]'),
    speciesRarity: fav.species_rarity,
    isFavorite: true,
    isPublic: Boolean(fav.is_public)
  };
}

function getFursona(id) {
  const row = fursonas.find(f => f.id === id);
  if (!row) return null;
  
  return {
    ...row,
    personality: JSON.parse(row.personality || '[]'),
    accessories: JSON.parse(row.accessories || '[]'),
    traits: JSON.parse(row.traits || '[]'),
    traitRarities: JSON.parse(row.trait_rarities || '[]'),
    speciesRarity: row.species_rarity,
    patternRarity: row.pattern_rarity,
    isFavorite: Boolean(row.is_favorite),
    isPublic: Boolean(row.is_public)
  };
}

function toggleFavorite(fursonaId, userId) {
  const fursona = fursonas.find(f => f.id === fursonaId && f.user_id === userId);
  if (fursona) {
    fursona.is_favorite = fursona.is_favorite === 1 ? 0 : 1;
    fursona.updated_at = Date.now();
    saveFursonas();
  }
}

function updateFursona(fursonaId, userId, name, isFavorite, isPublic) {
  const fursona = fursonas.find(f => f.id === fursonaId && f.user_id === userId);
  if (fursona) {
    fursona.name = name;
    fursona.is_favorite = isFavorite ? 1 : 0;
    fursona.is_public = isPublic ? 1 : 0;
    fursona.updated_at = Date.now();
    saveFursonas();
  }
}

function deleteFursona(fursonaId, userId) {
  const index = fursonas.findIndex(f => f.id === fursonaId && f.user_id === userId);
  if (index !== -1) {
    fursonas.splice(index, 1);
    saveFursonas();
  }
}

function getUserSettings(userId) {
  const user = users.find(u => u.id === userId);
  return user ? user.settings || {} : {};
}

function updateUserSettings(userId, settings) {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.settings = settings;
    user.updated_at = Date.now();
    saveUsers();
  }
}

// Trades
function createTrade(initiatorId, targetId, initiatorFursonaId, targetFursonaId) {
  const trade = {
    id: nextTradeId++,
    initiator_id: initiatorId,
    target_id: targetId,
    initiator_fursona_id: initiatorFursonaId || null,
    target_fursona_id: targetFursonaId || null,
    status: 'pending',
    created_at: Date.now(),
    updated_at: Date.now(),
    completed_at: null
  };
  
  trades.push(trade);
  saveTrades();
  return trade;
}

function getTrade(id) {
  return trades.find(t => t.id === id) || null;
}

function getPendingTrades(userId) {
  return trades.filter(t => t.target_id === userId && t.status === 'pending');
}

function getUserTrades(userId) {
  return trades
    .filter(t => (t.initiator_id === userId || t.target_id === userId) && t.status !== 'cancelled')
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, 20);
}

function updateTrade(tradeId, status) {
  const trade = trades.find(t => t.id === tradeId);
  if (trade) {
    trade.status = status;
    trade.updated_at = Date.now();
    if (status === 'completed') trade.completed_at = Date.now();
    saveTrades();
  }
}

function cancelTrade(tradeId, userId) {
  const trade = trades.find(t => t.id === tradeId && (t.initiator_id === userId || t.target_id === userId));
  if (trade) {
    trade.status = 'cancelled';
    trade.updated_at = Date.now();
    saveTrades();
  }
}

function completeTrade(tradeId, initiatorId, targetId, initiatorFursonaId, targetFursonaId) {
  // Update trade
  updateTrade(tradeId, 'completed');
  
  // Swap ownership
  if (initiatorFursonaId) {
    const fursona = fursonas.find(f => f.id === initiatorFursonaId);
    if (fursona) {
      fursona.user_id = targetId;
      fursona.updated_at = Date.now();
    }
  }
  if (targetFursonaId) {
    const fursona = fursonas.find(f => f.id === targetFursonaId);
    if (fursona) {
      fursona.user_id = initiatorId;
      fursona.updated_at = Date.now();
    }
  }
  
  saveFursonas();
}

// For compatibility with existing code that uses statements
const statements = {
  getUser: {
    get: (id) => users.find(u => u.id === id)
  },
  upsertUser: {
    run: (id, username, displayName) => getOrCreateUser({ id, username, displayName })
  },
  incrementGenerated: {
    run: (id) => {
      const user = users.find(u => u.id === id);
      if (user) { user.total_generated++; user.updated_at = Date.now(); saveUsers(); }
    }
  },
  getUserSettings: {
    get: (id) => getUserSettings(id)
  },
  updateUserSettings: {
    run: (settings, id) => updateUserSettings(id, JSON.parse(settings))
  },
  createFursona: {
    run: (userId, ...args) => {
      // This is handled by saveFursona
      return { lastInsertRowid: nextFursonaId - 1 };
    }
  },
  getFursona: {
    get: (id) => {
      const f = fursonas.find(f => f.id === id);
      return f ? {
        ...f,
        personality: f.personality,
        accessories: f.accessories,
        traits: f.traits,
        trait_rarities: f.trait_rarities,
        is_favorite: f.is_favorite,
        is_public: f.is_public
      } : undefined;
    }
  },
  getUserFursonas: {
    all: (userId) => fursonas.filter(f => f.user_id === userId).sort((a, b) => b.created_at - a.created_at)
  },
  getUserFursonaCount: {
    get: (userId) => ({ count: fursonas.filter(f => f.user_id === userId).length })
  },
  getFavoriteFursona: {
    get: (userId) => fursonas.find(f => f.user_id === userId && f.is_favorite === 1)
  },
  updateFursona: {
    run: (name, isFavorite, isPublic, fursonaId, userId) => updateFursona(fursonaId, userId, name, isFavorite, isPublic)
  },
  toggleFavorite: {
    run: (fursonaId, userId) => toggleFavorite(fursonaId, userId)
  },
  deleteFursona: {
    run: (fursonaId, userId) => deleteFursona(fursonaId, userId)
  },
  getUserStats: {
    get: (userId) => getStats(userId)
  },
  getLeaderboard: {
    all: (limit) => getLeaderboard(limit)
  },
  getSpeciesLeaderboard: {
    all: (limit) => {
      const speciesCounts = {};
      for (const f of fursonas) {
        if (!speciesCounts[f.species]) speciesCounts[f.species] = { count: 0, rarity: f.species_rarity };
        speciesCounts[f.species].count++;
      }
      return Object.entries(speciesCounts)
        .map(([species, data]) => ({ species, count: data.count, species_rarity: data.rarity }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    }
  },
  getRarityDistribution: {
    all: () => {
      const dist = {};
      for (const f of fursonas) {
        dist[f.species_rarity] = (dist[f.species_rarity] || 0) + 1;
      }
      return Object.entries(dist).map(([rarity, count]) => ({ species_rarity: rarity, count }));
    }
  },
  createTrade: {
    run: (initiatorId, targetId, initiatorFursonaId, targetFursonaId) => {
      const trade = createTrade(initiatorId, targetId, initiatorFursonaId, targetFursonaId);
      return { lastInsertRowid: trade.id };
    }
  },
  getTrade: {
    get: (id) => getTrade(id)
  },
  getPendingTrades: {
    all: (userId) => getPendingTrades(userId)
  },
  getUserTrades: {
    all: (userId) => getUserTrades(userId)
  },
  updateTrade: {
    run: (status, completedAt, tradeId) => updateTrade(tradeId, status)
  },
  cancelTrade: {
    run: (tradeId, userId1, userId2) => cancelTrade(tradeId, userId1)
  },
  completeTrade: (tradeId, initiatorId, targetId, initiatorFursonaId, targetFursonaId) => {
    completeTrade(tradeId, initiatorId, targetId, initiatorFursonaId, targetFursonaId);
  }
};

module.exports = {
  users,
  fursonas,
  trades,
  statements,
  getOrCreateUser,
  saveFursona,
  getFursonas,
  getStats,
  getLeaderboard,
  getFavoriteFursona,
  getFursona,
  getUserSettings,
  updateUserSettings,
  toggleFavorite,
  updateFursona,
  deleteFursona,
  createTrade,
  getTrade,
  getPendingTrades,
  getUserTrades,
  updateTrade,
  cancelTrade,
  completeTrade,
  close: () => {
    saveUsers();
    saveFursonas();
    saveTrades();
  }
};