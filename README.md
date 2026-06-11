# 🐾 Discord Fursona Generator Bot

A fun and simple Discord bot that generates unique, detailed fursona descriptions with a single command. Perfect for inspiration, roleplay, or just for fun!

## ✨ Features

- **Save Collection:** Save your favorite generations to your personal collection with a single click.
- **Manage Collection:** View and cycle through your saved fursonas anytime with `/collection`.
- **Apex Character Engine:** Generates high-fidelity character profiles suitable for TTRPGs, art commissions, or deep roleplay.
- **📊 Dynamic Stat System:** Randomly generates stats for STR, AGI, INT, CHA, LCK, and FLF (Fluffiness).
- **👗 Multi-Layer Wardrobe:** Complete outfit generation including Head, Neck, Torso, Legs, and signature Accessories.
- **🧠 Social & Life Lore:** Includes Social Class, Motivations, and ambitious Life Goals.
- **🗣️ Verbal Nuance:** Unique Speech Patterns combined with Sensory Scents and Voice types.
- **💾 Advanced Save System:** Save and browse your Apex character collection with a professional paginated viewer.
- **Infinite Variety:** Hundreds of species and millions of high-detail trait combinations.

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
