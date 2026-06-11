const species = [
    'Fox', 'Wolf', 'Dragon', 'Protogen', 'Sergal', 'Cat', 'Dog', 'Red Panda',
    'Husky', 'Tiger', 'Lion', 'Hyena', 'Raccoon', 'Bat', 'Deer', 'Otter',
    'Maned Wolf', 'Dutch Angel Dragon', 'Rexouium', 'Wickerbeast', 'Fennec Fox',
    'Snow Leopard', 'Grizzly Bear', 'Skunk', 'Rabbit', 'Opossum', 'Cheetah',
    'Axolotl', 'Shark', 'Orca', 'Griffin', 'Phoenix', 'Kirin', 'Jackalope',
    'Kobold', 'Avali', 'Protogen (Rare Variant)', 'Synx', 'Crux'
];

const colors = [
    'Electric Blue', 'Neon Green', 'Sunset Orange', 'Deep Purple', 'Pastel Pink',
    'Midnight Black', 'Snow White', 'Crimson Red', 'Emerald Green', 'Golden Yellow',
    'Chocolate Brown', 'Ash Gray', 'Mint Green', 'Lavender', 'Turquoise',
    'Pastel Yellow', 'Hot Pink', 'Royal Blue', 'Deep Maroon', 'Forest Green',
    'Cyan', 'Magenta', 'Silver', 'Gold', 'Iridescent Pearl', 'Ultraviolet'
];

const patterns = [
    'Solid', 'Spotted', 'Striped', 'Brindle', 'Gradient', 'Piebald', 'Rosettes',
    'Marbled', 'Speckled', 'Vibrant Markings', 'Glowing Runes', 'Starry/Galaxy',
    'Socks and Mittens', 'Underbelly Fade', 'Points (Ears/Tail/Paws)'
];

const personalities = [
    'Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated',
    'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic',
    'Anxious', 'Confident', 'Dreamy', 'Hyperactive', 'Gentle', 'Flirtatious',
    'Studious', 'Rebellious', 'Mysterious', 'Kind-hearted'
];

const quirks = [
    'Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook',
    'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies',
    'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them',
    'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail',
    'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys',
    'Has a holographic display on their visor', 'Wears a spiked collar',
    'Has wings that are too small for flight', 'Always has headphones on',
    'Is surprisingly good at cooking', 'Has a secret talent for singing'
];

const hobbies = [
    'Digital Art', 'Gaming', 'Hiking', 'Playing Bass Guitar', 'Baking Cookies',
    'Cosplaying', 'Writing Poetry', 'Stargazing', 'Coding', 'Collecting Pins',
    'Urban Exploration', 'Gardening', 'Swimming', 'Reading Sci-Fi', 'Photography'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateFursona() {
    return {
        species: getRandomElement(species),
        pattern: getRandomElement(patterns),
        primaryColor: getRandomElement(colors),
        secondaryColor: getRandomElement(colors),
        eyeColor: getRandomElement(colors),
        personality: getRandomElement(personalities),
        quirk: getRandomElement(quirks),
        hobby: getRandomElement(hobbies)
    };
}

module.exports = { generateFursona };
