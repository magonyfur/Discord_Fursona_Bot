const fs = require('fs');
const path = require('path');

class Config {
  constructor() {
    this.configPath = path.join(__dirname, 'config.env');
    this.config = this.load();
  }

  load() {
    const config = {};
    
    // Load from config.env if exists
    if (fs.existsSync(this.configPath)) {
      const content = fs.readFileSync(this.configPath, 'utf-8');
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex > 0) {
          const key = trimmed.slice(0, eqIndex).trim();
          const value = trimmed.slice(eqIndex + 1).trim();
          config[key] = this.parseValue(value);
        }
      }
    }
    
    // Override with environment variables
    for (const [key, value] of Object.entries(process.env)) {
      if (key.startsWith('DISCORD_') || key.startsWith('CLIENT_') || key.startsWith('GUILD_') || key.startsWith('LOG_') || key.startsWith('TEST_') || key.startsWith('DEBUG_')) {
        config[key] = value;
      }
    }
    
    return config;
  }

  parseValue(value) {
    // Boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    
    // Number
    if (/^\d+$/.test(value)) return parseInt(value, 10);
    if (/^\d*\.\d+$/.test(value)) return parseFloat(value);
    
    // Array (comma-separated)
    if (value.includes(',')) {
      return value.split(',').map(v => v.trim());
    }
    
    // Object (key:value pairs)
    if (value.includes(':') && value.includes(',')) {
      const obj = {};
      for (const pair of value.split(',')) {
        const [k, v] = pair.split(':');
        if (k && v) obj[k.trim()] = v.trim();
      }
      return obj;
    }
    
    return value;
  }

  get(key, defaultValue = null) {
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  getRarityColors() {
    return {
      common: this.get('RARITY_COLOR_COMMON', '#95A5A6'),
      uncommon: this.get('RARITY_COLOR_UNCOMMON', '#2ECC71'),
      rare: this.get('RARITY_COLOR_RARE', '#3498DB'),
      epic: this.get('RARITY_COLOR_EPIC', '#9B59B6'),
      legendary: this.get('RARITY_COLOR_LEGENDARY', '#F39C12')
    };
  }

  getRarityEmojis() {
    return {
      common: this.get('RARITY_EMOJI_COMMON', '⚪'),
      uncommon: this.get('RARITY_EMOJI_UNCOMMON', '🟢'),
      rare: this.get('RARITY_EMOJI_RARE', '🔵'),
      epic: this.get('RARITY_EMOJI_EPIC', '🟣'),
      legendary: this.get('RARITY_EMOJI_LEGENDARY', '🟡')
    };
  }

  getSpeciesRarity() {
    const raw = this.get('SPECIES_RARITY', {});
    if (typeof raw === 'object') return raw;
    
    const map = {};
    for (const pair of raw.split(',')) {
      const [species, rarity] = pair.split(':');
      if (species && rarity) map[species.trim()] = rarity.trim();
    }
    return map;
  }

  getPatternRarity() {
    const raw = this.get('PATTERN_RARITY', {});
    if (typeof raw === 'object') return raw;
    
    const map = {};
    for (const pair of raw.split(',')) {
      const [pattern, rarity] = pair.split(':');
      if (pattern && rarity) map[pattern.trim()] = rarity.trim();
    }
    return map;
  }

  getTraitRarity() {
    const raw = this.get('TRAIT_RARITY', {});
    if (typeof raw === 'object') return raw;
    
    const map = {};
    for (const pair of raw.split(',')) {
      const [trait, rarity] = pair.split(':');
      if (trait && rarity) map[trait.trim()] = rarity.trim();
    }
    return map;
  }

  getColorsByRarity() {
    return {
      common: this.get('COLOR_COMMON', '').split(',').map(c => c.trim()).filter(Boolean),
      uncommon: this.get('COLOR_UNCOMMON', '').split(',').map(c => c.trim()).filter(Boolean),
      rare: this.get('COLOR_RARE', '').split(',').map(c => c.trim()).filter(Boolean),
      epic: this.get('COLOR_EPIC', '').split(',').map(c => c.trim()).filter(Boolean),
      legendary: this.get('COLOR_LEGENDARY', '').split(',').map(c => c.trim()).filter(Boolean)
    };
  }

  getRarityWeights() {
    return {
      common: this.get('RARITY_WEIGHTS_COMMON', 50),
      uncommon: this.get('RARITY_WEIGHTS_UNCOMMON', 25),
      rare: this.get('RARITY_WEIGHTS_RARE', 15),
      epic: this.get('RARITY_WEIGHTS_EPIC', 8),
      legendary: this.get('RARITY_WEIGHTS_LEGENDARY', 2)
    };
  }
}

module.exports = new Config();