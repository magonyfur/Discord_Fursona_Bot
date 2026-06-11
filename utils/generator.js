const species = [
    'Fox', 'Wolf', 'Dragon', 'Protogen', 'Sergal', 'Cat', 'Dog', 'Red Panda',
    'Husky', 'Tiger', 'Lion', 'Hyena', 'Raccoon', 'Bat', 'Deer', 'Otter',
    'Maned Wolf', 'Dutch Angel Dragon', 'Rexouium', 'Wickerbeast'
];

const colors = [
    'Electric Blue', 'Neon Green', 'Sunset Orange', 'Deep Purple', 'Pastel Pink',
    'Midnight Black', 'Snow White', 'Crimson Red', 'Emerald Green', 'Golden Yellow',
    'Chocolate Brown', 'Ash Gray', 'Mint Green', 'Lavender', 'Turquoise'
];

const personalities = [
    'Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated',
    'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic'
];

const quirks = [
    'Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook',
    'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies',
    'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them',
    'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateFursona() {
    return {
        species: getRandomElement(species),
        primaryColor: getRandomElement(colors),
        secondaryColor: getRandomElement(colors),
        eyeColor: getRandomElement(colors),
        personality: getRandomElement(personalities),
        quirk: getRandomElement(quirks)
    };
}

module.exports = { generateFursona };
