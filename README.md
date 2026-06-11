# 🐾 Discord Fursona Generator Bot

A fun and simple Discord bot that generates unique, detailed fursona descriptions with a single command. Perfect for inspiration, roleplay, or just for fun!

## ✨ Features

- **Save Collection:** Save your favorite generations to your personal collection with a single click.
- **Manage Collection:** View and cycle through your saved fursonas anytime with `/collection`.
- **🌌 Multiverse Character Architect:** Generates sentient entities with planetary origins, moral alignments, and complex biological lore.
- **🌐 Dimensional Origins:** Includes home worlds ranging from Cyber-Industrial planets to Ancient Magical Realms.
- **⚖️ Moral Alignments:** Uses a refined 9-point alignment system (Lawful Good to Chaotic Evil).
- **🦴 Advanced Physiology:** High-detail biology including Blood Color and unique Magic Sources (Mana Core, Digital Glitch, etc.).
- **📜 Defining Life Events:** Generates a pivotal moment that shaped the character's history.
- **📊 Multiverse Stats:** Power-scaled stats (STR, AGI, INT, CHA, LCK, PWR) for dimensional consistency.
- **💾 Dimensional Archive:** Save and browse your multiversal collection with an advanced paginated viewer.
- **Infinite Variety:** Countless species and billions of complex biographical combinations.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.11.0 or higher recommended)
- A Discord Bot Token (Get one from the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/magonyfur/Discord_Fursona_Bot.git
   cd Discord_Fursona_Bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your bot token and client ID:
     ```env
     DISCORD_TOKEN=your_bot_token_here
     CLIENT_ID=your_client_id_here
     ```

### Running the Bot

Start the bot with Node.js:
```bash
node index.js
```
The bot will automatically register the `/fursona` command to all guilds it is in.

## 🛠️ Built With

- [discord.js](https://discord.js.org/) - Powerful library for interacting with the Discord API.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from `.env`.

## 📜 License

This project is licensed under the ISC License.
