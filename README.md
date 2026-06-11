# 🐾 Discord Fursona Bot

A fun Discord bot that generates unique fursonas with species, colors, patterns, personalities, accessories, and backstories!

## ✨ Features

- **Random Generation**: Creates unique fursonas with 60+ species, 24 colors, 22 patterns, 18 eye colors, 25 personalities, 30+ accessories, and 15 backstories
- **Interactive Buttons**: Regenerate, save to DMs, or share in-channel
- **Color Preview**: Visual color swatches for base, secondary, accent, and eye colors
- **Slash Commands**: Modern Discord slash command interface
- **Ephemeral Help**: Private help and species list commands

## 🚀 Quick Start

### 1. Create a Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" → Give it a name
3. Go to **Bot** tab → Click "Add Bot"
4. Copy the **Token** (you'll need this)
5. Copy the **Application ID** (Client ID)
6. Enable **Message Content Intent** and **Server Members Intent** under Privileged Gateway Intents

### 2. Configure the Bot
```bash
cd D:\Discord_Fursona_Bot_Hermes
copy .env.example .env
```

Edit `.env` with your credentials:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_id_here
GUILD_ID=your_test_server_id_here  # Optional: for instant command updates
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Deploy Slash Commands
```bash
# For development (instant updates to a specific server)
node deploy-commands.js

# For production (global, takes up to 1 hour)
# Remove GUILD_ID from .env first, then run:
node deploy-commands.js
```

### 5. Run the Bot
```bash
# Production
npm start

# Development (auto-restart on changes)
npm run dev
```

## 📖 Commands

| Command | Description |
|---------|-------------|
| `/fursona` | Generate a new random fursona |
| `/fursona-help` | Show help and button explanations |
| `/fursona-species` | List all available species (private) |

## 🎮 Button Actions

After generating a fursona, three buttons appear:

| Button | Action |
|--------|--------|
| 🔄 **Regenerate** | Create a completely new random fursona |
| 💾 **Save** | Send the fursona to your DMs for safekeeping |
| 📤 **Share** | Post the fursona in the current channel for everyone to see |

## 🎨 Fursona Components

Each generated fursona includes:

- **Name**: Procedurally generated (e.g., "Frostpaw", "Embertail")
- **Species**: 60+ options (Wolf, Fox, Dragon, Red Panda, etc.)
- **Age**: 18-500 years
- **Height/Weight**: Realistic ranges
- **Colors**: Base, secondary, accent (hex codes with visual preview)
- **Pattern**: 22 patterns (Solid, Tabby, Merle, Piebald, etc.)
- **Eye Color**: 18 options
- **Personality**: 3 random traits from 25 options
- **Accessories**: 1-3 random items from 30+ options
- **Special Traits**: 0-2 unique abilities (heterochromia, wings, magic, etc.)
- **Backstory**: One of 15 narrative hooks

## 🛠️ Development

### Project Structure
```
Discord_Fursona_Bot_Hermes/
├── index.js           # Main bot entry point
├── fursona.js         # Fursona generation logic & data
├── deploy-commands.js # Slash command registration
├── package.json       # Dependencies & scripts
├── .env               # Your credentials (not committed)
└── .env.example       # Template for .env
```

### Adding New Species
Edit `fursona.js` and add to the `SPECIES` array:
```javascript
const SPECIES = [
  'Wolf', 'Fox', 'Cat', 'YourNewSpecies', // ...
];
```

### Adding New Colors/Patterns/Traits
Similarly edit the respective arrays in `fursona.js`.

## 🔧 Troubleshooting

**"DISCORD_TOKEN not found"**
- Make sure `.env` exists and has `DISCORD_TOKEN=your_token`

**"Invalid Form Body" on command deploy**
- Check that `CLIENT_ID` is correct in `.env`
- For guild deployment, verify `GUILD_ID` is a valid server ID where the bot is added

**Buttons don't work**
- Ensure the bot has `applications.commands` scope in OAuth2 URL
- Re-invite bot with updated permissions if needed

**Bot doesn't respond**
- Check console for errors
- Verify Message Content Intent is enabled in Developer Portal
- Ensure bot has `Send Messages` and `Embed Links` permissions in the channel

## 📝 License

MIT License - Feel free to modify and share!

## 🙏 Credits

Built with [discord.js](https://discord.js.org/) • Inspired by the furry community's creativity