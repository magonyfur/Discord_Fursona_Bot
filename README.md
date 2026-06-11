# 🐾 Discord Fursona Bot v2.0

A feature-rich Discord bot that generates unique fursonas with a **rarity system**, **persistent collections**, **user profiles**, **trading**, and **leaderboards**!

## ✨ Major Features

### 🎲 **Fursona Generation**
- **60+ Species** across 5 rarities (Common → Legendary)
- **24 Patterns** with rarity (Solid, Tabby, Merle, Harlequin, etc.)
- **Procedural Colors** by rarity tier (Common → Legendary palettes)
- **3 Personality Traits** from 30+ options
- **1-4 Accessories** from 40+ items
- **Special Traits** (Heterochromia, Wings, Elemental Affinity, etc.)
- **20 Unique Backstories**

### 💎 **Rarity System**
| Rarity | Emoji | Color | Species Examples | Drop Rate |
|--------|-------|-------|------------------|-----------|
| Common | ⚪ | Gray | Wolf, Fox, Cat, Dog, Rabbit | 50% |
| Uncommon | 🟢 | Green | Hyena, Panther, Husky, Siamese | 25% |
| Rare | 🔵 | Blue | Bengal, Red Panda, Arctic Fox | 15% |
| Epic | 🟣 | Purple | Fennec Fox, Sphynx, Maine Coon | 8% |
| Legendary | 🟡 | Gold | **Dragon** | 2% |

Higher rarity = better colors, more special traits, unique species!

### 📚 **Persistent Collection**
- **JSON-based storage** (no database setup required)
- Save up to **200 fursonas** per user
- **Favorite** up to 5 special fursonas
- **Rename** and **delete** your fursonas
- View collection with **pagination**

### 👤 **User Profiles**
- Total fursonas generated
- Rarity breakdown (Legendary/Epic/Rare/Uncommon/Common counts)
- Unique species discovered
- Favorite fursona showcase
- Stats tracked automatically

### 🔄 **Trading System**
- Propose trades with other users
- Offer one of your fursonas for one of theirs
- **Gift mode** (offer without requesting return)
- 5-minute acceptance window
- Automatic ownership transfer on acceptance
- Trade history logged

### 🏆 **Leaderboards**
- Global rankings by collection size
- See your rank among all users
- Species popularity tracking

### ✨ **Custom Fursona Creator**
- Modal form for personalized creation
- Choose name, species, pattern, backstory
- Instantly saved to collection

### 🎨 **Beautiful Embeds**
- Color preview swatches (Base/Secondary/Accent/Eye)
- Rarity-colored embeds with emojis
- Interactive buttons for all actions
- Clean, organized layouts

## 🚀 Quick Start

### 1. Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. "New Application" → Name it
3. **Bot** tab → "Add Bot"
4. Copy **Token** and **Application ID (Client ID)**
5. Enable **Message Content Intent** & **Server Members Intent**
6. OAuth2 → URL Generator → `bot` + `applications.commands` scopes
7. Invite to your server

### 2. Configure
```bash
cd D:\Discord_Fursona_Bot_Hermes
copy .env.example .env
```

Edit `.env`:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_id_here
GUILD_ID=your_test_server_id_here  # Optional: for instant command updates
```

### 3. Install & Deploy
```bash
npm install
npm run deploy
```

### 4. Run
```bash
npm start        # Production
npm run dev      # Development (auto-restart)
```

## 📖 Commands

| Command | Description |
|---------|-------------|
| `/fursona generate` | Generate a random fursona |
| `/fursona custom` | Create a custom fursona (modal) |
| `/fursona-profile [user]` | View profile & stats |
| `/fursona-collection [user] [page]` | Browse collection |
| `/fursona-leaderboard [page]` | Global leaderboard |
| `/fursona-species` | List all species by rarity |
| `/fursona-trade <user> <your_fursona> [their_fursona]` | Propose trade |
| `/fursona-help` | Show this help |

## 🎮 Interactive Buttons

After generating a fursona:
| Button | Action |
|--------|--------|
| 🔄 **Regenerate** | New random fursona |
| 💾 **Save** | Add to permanent collection |
| 📤 **Share** | Post in channel |

For saved fursonas:
| Button | Action |
|--------|--------|
| 💛 **Favorite** | Toggle favorite status |
| ✏️ **Rename** | Change name via modal |
| 🗑️ **Delete** | Remove from collection |

Collection navigation:
| Button | Action |
|--------|--------|
| ◀ **Previous** | Previous page |
| **Next** ▶ | Next page |
| 🔍 **View Details** | Select menu for details |

## 🛠️ Configuration

Edit `config.env` to customize:

```env
# Cooldowns (seconds)
COOLDOWN_GENERATE=10
COOLDOWN_CUSTOM=30
COOLDOWN_TRADE=60
COOLDOWN_PROFILE=5

# Limits
MAX_FURSONAS_PER_USER=200
MAX_TRADES_PER_USER=5

# Rarity Weights (must sum to 100)
RARITY_WEIGHTS_COMMON=50
RARITY_WEIGHTS_UNCOMMON=25
RARITY_WEIGHTS_RARE=15
RARITY_WEIGHTS_EPIC=8
RARITY_WEIGHTS_LEGENDARY=2

# Feature Flags
ENABLE_TRADING=true
ENABLE_PROFILES=true
ENABLE_LEADERBOARD=true
ENABLE_CUSTOM_FURSONA=true
ENABLE_FAVORITES=true
ENABLE_COLLECTION=true
```

### Species Rarity
Edit `SPECIES_RARITY` in `config.env`:
```
SPECIES_RARITY=Wolf:common,Fox:common,Dragon:legendary,...
```

### Colors by Rarity
Customize `COLOR_COMMON`, `COLOR_UNCOMMON`, `COLOR_RARE`, `COLOR_EPIC`, `COLOR_LEGENDARY` with hex codes.

## 📁 Project Structure
```
Discord_Fursona_Bot_Hermes/
├── index.js              # Main bot entry point
├── fursona.js            # Generation logic, embeds, modals, rarity
├── database.js           # JSON file storage (users, fursonas, trades)
├── config.js             # Configuration loader
├── config.env            # All customizable settings
├── deploy-commands.js    # Slash command registration
├── package.json          # Dependencies & scripts
├── .env                  # Credentials (not committed)
├── .env.example          # Template
├── README.md             # This file
└── data/                 # Auto-created JSON storage
    ├── users.json
    ├── fursonas.json
    └── trades.json
```

## 🔧 Development

### Adding Species
Edit `SPECIES` array in `fursona.js` and add rarity in `config.env`:
```javascript
// fursona.js
const SPECIES = [..., 'YourSpecies'];

// config.env
SPECIES_RARITY=...,YourSpecies:rare
```

### Adding Patterns/Traits/Colors
Similarly edit arrays in `fursona.js` and corresponding config sections.

### Custom Backstories
Add to `BACKSTORIES` array in `fursona.js`.

## 🐛 Troubleshooting

**"DISCORD_TOKEN not found"**
- Ensure `.env` exists with valid token

**"Invalid Form Body" on deploy**
- Check `CLIENT_ID` in `.env`
- For guild deploy, verify `GUILD_ID` is correct

**Buttons don't work**
- Bot needs `applications.commands` OAuth2 scope
- Re-invite with updated permissions

**Bot doesn't respond**
- Check console for errors
- Verify Message Content Intent enabled
- Ensure bot has `Send Messages` / `Embed Links` permissions

**Data not persisting**
- Check `data/` folder permissions
- JSON files auto-created on first run

## 📝 License

MIT License - Modify and share freely!

## 🙏 Credits

Built with [discord.js](https://discord.js.org/) • Inspired by the furry community's creativity