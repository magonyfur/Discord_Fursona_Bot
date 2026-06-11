# 🐾 Discord Fursona Generator Bot

A fun and simple Discord bot that generates unique, detailed fursona descriptions with a single command. Perfect for inspiration, roleplay, or just for fun!

## ✨ Features

- **Infinite Variety:** Hundreds of species (Canine, Feline, Aquatic, Mythical, Original) and millions of trait combinations.
- **Multi-Dimensional Profiles:**
    - **🧬 Basic Info:** Species, Personality, Aesthetic.
    - **🎨 Appearance:** High-detail colors, patterns, and pupil types.
    - **🦴 Physical Traits:** Specific Ear and Tail types, plus Elemental Affinity.
    - **📜 Lore & Background:** Random Occupations and Habitats for instant backstory.
    - **👂 Sensory Details:** Unique scents and voice types for immersive roleplay.
- **Professional Embeds:** Sophisticated, multi-field Discord layouts with themed emojis.
- **Slash Commands:** Modern `/fursona` command for easy use.

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
