const species = [
    // Canine
    'Fox', 'Wolf', 'Husky', 'German Shepherd', 'Golden Retriever', 'Border Collie', 'Doberman', 'Beagle', 'Corgi', 'Shiba Inu', 'Greyhound', 'Dalmatian', 'Fennec Fox', 'Arctic Fox', 'Silver Fox', 'Maned Wolf', 'Coyote', 'Jackal', 'African Wild Dog', 'Hyena', 'Aardwolf', 'African Golden Wolf', 'Tibetan Mastiff', 'Bernese Mountain Dog', 'Samoyed', 'Akita Inu', 'Basenji',
    // Feline
    'Tabby Cat', 'Calico Cat', 'Siamese Cat', 'Maine Coon', 'Sphynx Cat', 'Lion', 'Tiger', 'Leopard', 'Snow Leopard', 'Cheetah', 'Cougar', 'Panther', 'Lynx', 'Bobcat', 'Serval', 'Ocelot', 'Caracal', 'Clouded Leopard', 'Saber-toothed Cat (Ancient)', 'Fishing Cat', 'Scottish Fold', 'Bengal Cat',
    // Mustelids & Small Mammals
    'Red Panda', 'Raccoon', 'Opossum', 'Skunk', 'Otter', 'Sea Otter', 'Ferret', 'Weasel', 'Badger', 'Honey Badger', 'Wolverine', 'Rabbit', 'Hare', 'Hedgehog', 'Porcupine', 'Squirrel', 'Chipmunk', 'Beaver', 'Mouse', 'Rat', 'Hamster', 'Guinea Pig', 'Capybara', 'Sugar Glider', 'Mole', 'Platypus',
    // Large Mammals
    'Grizzly Bear', 'Polar Bear', 'Panda Bear', 'Black Bear', 'Sun Bear', 'Deer', 'Elk', 'Moose', 'Reindeer', 'Horse', 'Zebra', 'Donkey', 'Mule', 'Giraffe', 'Elephant', 'Rhino', 'Hippo', 'Kangaroo', 'Wallaby', 'Koala', 'Wombat', 'Bat', 'Fruit Bat', 'Vampire Bat', 'Sloth', 'Armadillo', 'Anteater', 'Tapir', 'Okapi',
    // Reptiles & Amphibians
    'Axolotl', 'Frog', 'Toad', 'Chameleon', 'Gecko', 'Bearded Dragon', 'Iguana', 'Monitor Lizard', 'Komodo Dragon', 'Snake', 'Cobra', 'Python', 'Viper', 'Turtle', 'Tortoise', 'Alligator', 'Crocodile', 'Newt', 'Salamander', 'Blue-tongued Skink',
    // Birds
    'Eagle', 'Hawk', 'Falcon', 'Owl', 'Raven', 'Crow', 'Parrot', 'Macaw', 'Cockatiel', 'Penguin', 'Flamingo', 'Swan', 'Duck', 'Goose', 'Peacock', 'Griffin', 'Hippogriff', 'Phoenix', 'Kingfisher', 'Hummingbird', 'Ostrich', 'Vulture', 'Secretary Bird',
    // Aquatic
    'Shark', 'Hammerhead Shark', 'Great White Shark', 'Mako Shark', 'Orca', 'Dolphin', 'Stingray', 'Manta Ray', 'Seahorse', 'Seal', 'Sea Lion', 'Walrus', 'Manatee', 'Narwhal', 'Giant Squid-inspired', 'Eel', 'Jellyfish-inspired Hybrid',
    // Community/Original
    'Protogen', 'Primagen', 'Sergal', 'Avali', 'Dutch Angel Dragon', 'Rexouium', 'Wickerbeast', 'Manokit', 'Crux', 'Synx', 'Skull Dog', 'Doberman Skull', 'Chakat', 'Nargacuga', 'Zinogre', 'Kirin', 'Mothman', 'Wendigo-inspired', 'Aardoni', 'Protogen (Rare)', 'Crystacat', 'Ampwave', 'Mocha (Species)', 'Snyas', 'Taidum', 'Nanachi-inspired', 'Batcoon', 'Valenth',
    // Mythical/Hybrids
    'Dragon', 'Western Dragon', 'Eastern Dragon', 'Wyvern', 'Drake', 'Hydra', 'Pegasus', 'Unicorn', 'Alicorn', 'Sphinx', 'Chimera', 'Centaur-style Hybrid', 'Jackalope', 'Wolpertinger', 'Kitsune (9-tails)', 'Cerberus-inspired', 'Minotaur-inspired', 'Manticore', 'Basilisk-hybrid', 'Leviathan-inspired'
];

const colors = [
    'Electric Blue', 'Neon Green', 'Sunset Orange', 'Deep Purple', 'Pastel Pink', 'Midnight Black', 'Snow White', 'Crimson Red', 'Emerald Green', 'Golden Yellow', 'Chocolate Brown', 'Ash Gray', 'Mint Green', 'Lavender', 'Turquoise', 'Pastel Yellow', 'Hot Pink', 'Royal Blue', 'Deep Maroon', 'Forest Green', 'Cyan', 'Magenta', 'Silver', 'Gold', 'Iridescent Pearl', 'Ultraviolet', 'Obsidian', 'Ivory', 'Coral', 'Teal', 'Indigo', 'Amber', 'Copper', 'Bronze', 'Rose Gold', 'Periwinkle', 'Chartreuse', 'Vermilion', 'Cerulean', 'Slate', 'Neon Purple', 'Pastel Blue', 'Rust', 'Sand', 'Olive', 'Peach', 'Mint', 'Lilac', 'Titanium', 'Gunmetal', 'Crimson', 'Sapphire', 'Ruby', 'Topaz', 'Eucalyptus', 'Burgundy', 'Sky Blue', 'Honey', 'Coffee', 'Caramel', 'Midnight Navy', 'Toxic Yellow'
];

const patterns = [
    'Solid', 'Spotted', 'Striped', 'Brindle', 'Gradient', 'Piebald', 'Rosettes', 'Marbled', 'Speckled', 'Vibrant Markings', 'Glowing Runes', 'Starry/Galaxy', 'Socks and Mittens', 'Underbelly Fade', 'Points (Ears/Tail/Paws)', 'Vitiligo-style Patches', 'Dappled', 'Symmetrical Tribal Tattoos', 'Bioluminescent Veins', 'Splattered Paint Look', 'Geometric Accents', 'Honeycomb Pattern', 'Circuitry Lines', 'Cloud-like Swirls', 'Zebra Stripes', 'Tiger Stripes', 'Cheetah Spots', 'Iridescent Sheen', 'Oil Slick', 'Lace-like Markings', 'Fractal Designs', 'Camo', 'Faded Newspaper Texture'
];

const advancedPhysiology = {
    blood: ['Crimson Red', 'Neon Blue', 'Glowing Gold', 'Deep Violet', 'Clear/Transparent', 'Black Oil', 'Silver Mercury', 'Green Acid'],
    magicSource: ['Internal Mana Core', 'Ancient Bloodline', 'Technological Augmentation', 'Celestial Blessing', 'Planetary Energy', 'Contract with a Spirit', 'Chaos/Digital Glitch', 'Natural Connection to Elements'],
    measurements: {
        heights: ['120cm (Tiny)', '155cm (Short)', '175cm (Average)', '190cm (Tall)', '215cm (Towering)', '250cm+ (Giant)'],
        weights: ['Light/Featherweight', 'Lean/Athletic', 'Heavy/Burly', 'Average Build', 'Stocky/Solid']
    }
};

const morality = [
    'Lawful Good (Crusader)', 'Neutral Good (Benefactor)', 'Chaotic Good (Rebel)',
    'Lawful Neutral (Judge)', 'True Neutral (Undecided)', 'Chaotic Neutral (Free Spirit)',
    'Lawful Evil (Dominator)', 'Neutral Evil (Malefactor)', 'Chaotic Evil (Destroyer)'
];

const reputation = [
    'Beloved Hero of the People', 'Feared Urban Legend', 'Notorious Trouble-maker',
    'Respected Intellectual', 'Mysterious Shadow Figure', 'Commoner among Elite',
    'Exiled Outcast', 'Rising Star of the Arena', 'Humble Saint'
];

const lifeEvents = [
    'Witnessed a falling star that changed their DNA', 'Lost everything in a great fire and rebuilt',
    'Discovered an ancient relic in a hidden cave', 'Was the only survivor of a space station disaster',
    'Won a legendary duel that earned them their weapon', 'Escaped from a high-security research facility',
    'Traveled through a rift into another dimension', 'Athelete who broke a world record using magic',
    'Saved a powerful spirit who now protects them'
];

const elements = [
    'Inferno (Fire)', 'Glacier (Ice)', 'Storm (Lightning)', 'Quake (Earth)', 'Cyclone (Air)', 'Abyss (Shadow)', 'Nova (Light)', 'Quantum (Space)', 'Verdant (Nature)', 'Clockwork (Metal)', 'Plasma (Energy)', 'Void (Nothingness)'
];

const origins = [
    'Cyber-Industrial Mega-Planet', 'Ancient Magical Realm', 'Post-Apocalyptic Earth', 'Utopian Floating City', 'Nomadic Space Fleet', 'Inter-dimensional Nexus', 'Deep-sea Abyss City', 'Subterranean Kingdom'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateStats() {
    return {
        STR: Math.floor(Math.random() * 20) + 1,
        AGI: Math.floor(Math.random() * 20) + 1,
        INT: Math.floor(Math.random() * 20) + 1,
        CHA: Math.floor(Math.random() * 20) + 1,
        LCK: Math.floor(Math.random() * 20) + 1,
        FLF: Math.floor(Math.random() * 20) + 1,
        PWR: Math.floor(Math.random() * 20) + 1 // Power Level
    };
}

function generateFursona() {
    return {
        // Core
        species: getRandomElement(species),
        alignment: getRandomElement(morality),
        origin: getRandomElement(origins),
        personality: getRandomElement(['Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated', 'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic', 'Anxious', 'Confident', 'Dreamy', 'Hyperactive', 'Gentle', 'Flirtatious', 'Studious', 'Rebellious', 'Mysterious', 'Kind-hearted', 'Eccentric', 'Philosophical', 'Protective', 'Ambitious', 'Carefree', 'Whimsical', 'Charismatic', 'Apathetic', 'Determined']),
        
        // Appearance
        primaryColor: getRandomElement(colors),
        secondaryColor: getRandomElement(colors),
        pattern: getRandomElement(patterns),
        eyeColor: getRandomElement(colors),
        
        // Physiology
        height: getRandomElement(advancedPhysiology.measurements.heights),
        weight: getRandomElement(advancedPhysiology.measurements.weights),
        blood: getRandomElement(advancedPhysiology.blood),
        source: getRandomElement(advancedPhysiology.magicSource),
        
        // Status & Lore
        reputation: getRandomElement(reputation),
        lifeEvent: getRandomElement(lifeEvents),
        element: getRandomElement(elements),
        
        // Stats
        stats: generateStats(),
        
        // Sensory & Personal
        voice: getRandomElement(['Deep and Gravelly', 'Soft and Melodic', 'Raspy Whisper', 'Energetic and High-pitched', 'Calm and Monotone', 'Cheerful and Bubbly', 'Sultry and Smooth', 'Robotically Modulated', 'Slightly echoey', 'Warm and comforting']),
        scent: getRandomElement(['Fresh Rain and Pine', 'Old Books and Vanilla', 'Gunpowder and Ozone', 'Strawberries and Cream', 'Sandalwood and Spice', 'Sea Salt and Citrus', 'Coffee and Morning Mist', 'Lavender and Honey', 'Burnt Sugar and Smoke', 'Freshly Cut Grass', 'New Parchment', 'Peppermint and Snow']),
        
        quirk: getRandomElement(['Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook', 'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies', 'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them', 'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail', 'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys', 'Has a holographic display on their visor', 'Wears a spiked collar', 'Has wings that are too small for flight', 'Always has headphones on', 'Is surprisingly good at cooking', 'Has a secret talent for singing', 'Purrs when happy', 'Hoards shiny objects', 'Has a distinctive scar over one eye', 'Is always covered in glitter', 'Sneezes like a kitten', 'Has tiny horns hidden in fur', 'Tail wags uncontrollably', 'Afraid of vacuum cleaners', 'Always smells like cinnamon', 'Can see ghosts', 'Collects vintage postcards', 'Can only sleep while hanging upside down'])
    };
}

module.exports = { generateFursona };
