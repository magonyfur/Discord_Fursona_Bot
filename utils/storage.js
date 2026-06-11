const fs = require('node:fs');
const path = require('node:path');

const DATA_PATH = path.join(__dirname, '../data/saves.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_PATH))) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
}

// Ensure saves.json exists
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({}), 'utf8');
}

function getSaves() {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading saves file:', error);
        return {};
    }
}

function saveToUser(userId, fursona) {
    const allSaves = getSaves();
    if (!allSaves[userId]) {
        allSaves[userId] = [];
    }
    
    // Add timestamp to the save
    const saveEntry = {
        ...fursona,
        savedAt: new Date().toISOString()
    };
    
    allSaves[userId].push(saveEntry);
    
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(allSaves, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing saves file:', error);
        return false;
    }
}

function getUserSaves(userId) {
    const allSaves = getSaves();
    return allSaves[userId] || [];
}

module.exports = { saveToUser, getUserSaves };
