const species = [
    // Canine
    'Fox', 'Wolf', 'Husky', 'German Shepherd', 'Golden Retriever', 'Border Collie', 'Doberman', 'Beagle', 'Corgi', 'Shiba Inu', 'Greyhound', 'Dalmatian', 'Fennec Fox', 'Arctic Fox', 'Silver Fox', 'Maned Wolf', 'Coyote', 'Jackal', 'African Wild Dog', 'Hyena', 'Aardwolf',
    // Feline
    'Tabby Cat', 'Calico Cat', 'Siamese Cat', 'Maine Coon', 'Sphynx Cat', 'Lion', 'Tiger', 'Leopard', 'Snow Leopard', 'Cheetah', 'Cougar', 'Panther', 'Lynx', 'Bobcat', 'Serval', 'Ocelot', 'Caracal',
    // Mustelids & Small Mammals
    'Red Panda', 'Raccoon', 'Opossum', 'Skunk', 'Otter', 'Sea Otter', 'Ferret', 'Weasel', 'Badger', 'Honey Badger', 'Wolverine', 'Rabbit', 'Hare', 'Hedgehog', 'Porcupine', 'Squirrel', 'Chipmunk', 'Beaver', 'Mouse', 'Rat', 'Hamster', 'Guinea Pig',
    // Large Mammals
    'Grizzly Bear', 'Polar Bear', 'Panda Bear', 'Black Bear', 'Sun Bear', 'Deer', 'Elk', 'Moose', 'Reindeer', 'Horse', 'Zebra', 'Donkey', 'Mule', 'Giraffe', 'Elephant', 'Rhino', 'Hippo', 'Kangaroo', 'Wallaby', 'Koala', 'Wombat', 'Bat', 'Fruit Bat', 'Vampire Bat',
    // Reptiles & Amphibians
    'Axolotl', 'Frog', 'Toad', 'Chameleon', 'Gecko', 'Bearded Dragon', 'Iguana', 'Monitor Lizard', 'Komodo Dragon', 'Snake', 'Cobra', 'Python', 'Viper', 'Turtle', 'Tortoise', 'Alligator', 'Crocodile',
    // Birds
    'Eagle', 'Hawk', 'Falcon', 'Owl', 'Raven', 'Crow', 'Parrot', 'Macaw', 'Cockatiel', 'Penguin', 'Flamingo', 'Swan', 'Duck', 'Goose', 'Peacock', 'Griffin', 'Hippogriff', 'Phoenix',
    // Aquatic
    'Shark', 'Hammerhead Shark', 'Great White Shark', 'Mako Shark', 'Orca', 'Dolphin', 'Stingray', 'Manta Ray', 'Seahorse', 'Seal', 'Sea Lion', 'Walrus', 'Manatee', 'Narwhal',
    // Community/Original
    'Protogen', 'Primagen', 'Sergal', 'Avali', 'Dutch Angel Dragon', 'Rexouium', 'Wickerbeast', 'Manokit', 'Crux', 'Synx', 'Skull Dog', 'Doberman Skull', 'Chakat', 'Nargacuga', 'Zinogre', 'Kirin', 'Mothman', 'Wendigo-inspired', 'Aardoni', 'Protogen (Rare)', 'Crystacat', 'Ampwave', 'Mocha (Species)',
    // Mythical/Hybrids
    'Dragon', 'Western Dragon', 'Eastern Dragon', 'Wyvern', 'Drake', 'Hydra', 'Pegasus', 'Unicorn', 'Alicorn', 'Sphinx', 'Chimera', 'Centaur-style Hybrid', 'Jackalope', 'Wolpertinger', 'Kitsune (9-tails)', 'Cerberus-inspired', 'Minotaur-inspired'
];

const colors = [
    'Electric Blue', 'Neon Green', 'Sunset Orange', 'Deep Purple', 'Pastel Pink', 'Midnight Black', 'Snow White', 'Crimson Red', 'Emerald Green', 'Golden Yellow', 'Chocolate Brown', 'Ash Gray', 'Mint Green', 'Lavender', 'Turquoise', 'Pastel Yellow', 'Hot Pink', 'Royal Blue', 'Deep Maroon', 'Forest Green', 'Cyan', 'Magenta', 'Silver', 'Gold', 'Iridescent Pearl', 'Ultraviolet', 'Obsidian', 'Ivory', 'Coral', 'Teal', 'Indigo', 'Amber', 'Copper', 'Bronze', 'Rose Gold', 'Periwinkle', 'Chartreuse', 'Vermilion', 'Cerulean', 'Slate', 'Neon Purple', 'Pastel Blue', 'Rust', 'Sand', 'Olive', 'Peach', 'Mint', 'Lilac', 'Titanium', 'Gunmetal', 'Crimson', 'Sapphire', 'Ruby', 'Topaz'
];

const patterns = [
    'Solid', 'Spotted', 'Striped', 'Brindle', 'Gradient', 'Piebald', 'Rosettes', 'Marbled', 'Speckled', 'Vibrant Markings', 'Glowing Runes', 'Starry/Galaxy', 'Socks and Mittens', 'Underbelly Fade', 'Points (Ears/Tail/Paws)', 'Vitiligo-style Patches', 'Dappled', 'Symmetrical Tribal Tattoos', 'Bioluminescent Veins', 'Splattered Paint Look', 'Geometric Accents', 'Honeycomb Pattern', 'Circuitry Lines', 'Cloud-like Swirls', 'Zebra Stripes', 'Tiger Stripes', 'Cheetah Spots', 'Iridescent Sheen'
];

const physicalFeatures = {
    ears: ['Large and Pointy', 'Small and Rounded', 'Floppy/Droopy', 'Tufted', 'Long and Velvety', 'Mechanical/Cybernetic', 'Missing an Ear', 'Pierced with many rings', 'Extra fluffy'],
    tails: ['Very Long and Fluffy', 'Short/Stubby', 'Curly/Ringed', 'Thin and Sleek', 'Feathered', 'Scaly/Reptilian', 'Multiple Tails (2-9)', 'No Tail', 'Transparent/Liquid', 'Ending in a tuft', 'Blade-tipped'],
    eyes: ['Glowing Iris', 'Slit Pupils (Reptilian)', 'Large and Anime-like', 'Multi-colored (Heterochromia)', 'Blank/White', 'Blind in one eye', 'Constantly shifting colors', 'Horizontal Pupils (Goat-like)']
};

const aesthetics = [
    'Cyberpunk', 'Cottagecore', 'Vaporwave', 'Steampunk', 'Gothic', 'Minimalist', 'Space Core', 'Solarpunk', 'Grunge', 'Y2K', 'Retro-Futuristic', 'Dark Academia', 'Fairycore', 'Techwear', 'Vintage/Boho', 'Synthwave', 'Royal/Elegant', 'Post-Apocalyptic', 'Fantasy/Medieval', 'Modern Casual', 'Streetwear', 'Pastel Goth', 'Witchcore'
];

const elements = [
    'Fire/Heat', 'Water/Ice', 'Earth/Nature', 'Air/Wind', 'Electricity/Lightning', 'Shadow/Darkness', 'Light/Holy', 'Cosmic/Starpower', 'Arcane Magic', 'Mechanical/Technological', 'Psionic/Mind', 'Toxic/Acid', 'Blood/Life Force', 'Gravity', 'Time', 'Sound/Music'
];

const lore = {
    occupations: ['Healer', 'Space Pilot', 'Bounty Hunter', 'Florist', 'Blacksmith', 'Cyber-Hacker', 'Librarian', 'Street Performer', 'Scientist', 'Knight', 'Merchant', 'Alchemist', 'DJ', 'Scavenger', 'Royal Guard', 'Chef', 'Architect', 'Detective'],
    habitats: ['Neon-drenched Megacity', 'Ancient Enchanted Forest', 'Floating Island', 'Deep Sea Colony', 'Underground Bunker', 'Desert Oasis', 'Asteroid Belt Station', 'Cozy Mountain Cabin', 'Cloud Kingdom', 'Crystal Caves', 'Post-Apocalyptic Wasteland', 'Victorian-era Village'],
    sensory: {
        scents: ['Fresh Rain and Pine', 'Old Books and Vanilla', 'Gunpowder and Ozone', 'Strawberries and Cream', 'Sandalwood and Spice', 'Sea Salt and Citrus', 'Coffee and Morning Mist', 'Lavender and Honey', 'Burnt Sugar and Smoke'],
        voices: ['Deep and Gravelly', 'Soft and Melodic', 'Raspy Whisper', 'Energetic and High-pitched', 'Calm and Monotone', 'Cheerful and Bubbly', 'Sultry and Smooth', 'Robotically Modulated']
    }
};

const quirks = [
    'Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook', 'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies', 'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them', 'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail', 'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys', 'Has a holographic display on their visor', 'Wears a spiked collar', 'Has wings that are too small for flight', 'Always has headphones on', 'Is surprisingly good at cooking', 'Has a secret talent for singing', 'Purrs when happy', 'Hoards shiny objects', 'Has a distinctive scar over one eye', 'Is always covered in glitter', 'Sneezes like a kitten', 'Has tiny horns hidden in fur', 'Tail wags uncontrollably', 'Afraid of vacuum cleaners', 'Always smells like cinnamon', 'Can see ghosts', 'Collects vintage postcards', 'Can only sleep while hanging upside down'
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
        
        // Physical
        ears: getRandomElement(physicalFeatures.ears),
        tail: getRandomElement(physicalFeatures.tails),
        pupils: getRandomElement(physicalFeatures.eyes),
        
        // Personality & Aesthetic
        personality: getRandomElement(['Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated', 'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic', 'Anxious', 'Confident', 'Dreamy', 'Hyperactive', 'Gentle', 'Flirtatious', 'Studious', 'Rebellious', 'Mysterious', 'Kind-hearted', 'Eccentric', 'Philosophical', 'Protective', 'Ambitious', 'Carefree', 'Whimsical']),
        aesthetic: getRandomElement(aesthetics),
        element: getRandomElement(elements),
        
        // Lore
        occupation: getRandomElement(lore.occupations),
        habitat: getRandomElement(lore.habitats),
        scent: getRandomElement(lore.sensory.scents),
        voice: getRandomElement(lore.sensory.voices),
        
        quirk: getRandomElement(quirks)
    };
}

module.exports = { generateFursona };
