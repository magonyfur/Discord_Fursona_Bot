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

const wardrobe = {
    head: ['None', 'Wide-brimmed Hat', 'Beanie with ear holes', 'Crown of Flowers', 'Aviator Goggles', 'Snapback Cap', 'Pointy Wizard Hat', 'VR Headset', 'Golden Circlet', 'Skull Mask', 'Headphones'],
    neck: ['None', 'Spiked Collar', 'Silk Scarf', 'Heavy Silver Chain', 'Glowing Pendant', 'Colorful Bandana', 'Bowtie', 'Clockwork Choker', 'Leather Cuffs (Neck)', 'Feathered Boa'],
    torso: ['None', 'Oversized Hoodie', 'Tactical Vest', 'Formal Waistcoat', 'Battered Leather Jacket', 'Hawaiian Shirt', 'Tattered Cloak', 'High-tech Armor Plate', 'Crop Top', 'Vintage Cardigan', 'Flannel Shirt'],
    legs: ['None', 'Cargo Shorts', 'Skinny Jeans', 'Baggy Techwear Pants', 'Formal Slacks', 'Distressed Denim', 'Leg Warmers', 'Armor Greaves', 'Skirt with frills', 'Kilt', 'Cybernetic Braces'],
    accessory: ['None', 'Messenger Bag', 'Staff of Power', 'Holographic Wrist-pad', 'Nunchucks', 'Ancient Grimoire', 'Tool Belt', 'Guitar strapped to back', 'Plushie in pocket', 'Sheathed Dagger', 'Energy Shield']
};

const psychology = {
    motivations: ['Finding a lost family heirloom', 'Becoming a world-renowned artist', 'Protecting the weak', 'Seeking ultimate knowledge', 'Rebuilding a fallen kingdom', 'Living a quiet life in nature', 'Toppling a corrupt corporation', 'Mapping the entire galaxy', 'Mastering the culinary arts'],
    goals: ['To find true love', 'To invent a new form of energy', 'To win a legendary tournament', 'To make everyone smile', 'To be the first of their kind in space', 'To write a best-selling novel', 'To start a successful business'],
    social: ['Reclusive Hermit', 'High-society Socialite', 'Street-smart Rogue', 'Respected Village Elder', 'Famous Internet Celebrity', 'Humble Apprentice', 'Exiled Royalty', 'Middle-class Professional', 'Roaming Nomad']
};

const speech = ['Talks in technical jargon', 'Uses many "furry" puns', 'Extremely formal and polite', 'Speaks in short, clipped sentences', 'Slow and thoughtful', 'Very fast and excitable', 'Whispers almost constantly', 'Sings their words', 'Uses heavy slang', 'Dry and sarcastic'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateStats() {
    return {
        STR: Math.floor(Math.random() * 10) + 1,
        AGI: Math.floor(Math.random() * 10) + 1,
        INT: Math.floor(Math.random() * 10) + 1,
        CHA: Math.floor(Math.random() * 10) + 1,
        LCK: Math.floor(Math.random() * 10) + 1,
        FLF: Math.floor(Math.random() * 10) + 1 // Fluffiness
    };
}

function generateFursona() {
    return {
        // Core
        species: getRandomElement(species),
        pattern: getRandomElement(patterns),
        primaryColor: getRandomElement(colors),
        secondaryColor: getRandomElement(colors),
        eyeColor: getRandomElement(colors),
        personality: getRandomElement(['Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated', 'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic', 'Anxious', 'Confident', 'Dreamy', 'Hyperactive', 'Gentle', 'Flirtatious', 'Studious', 'Rebellious', 'Mysterious', 'Kind-hearted', 'Eccentric', 'Philosophical', 'Protective', 'Ambitious', 'Carefree', 'Whimsical', 'Charismatic', 'Apathetic', 'Determined']),
        
        // Stats
        stats: generateStats(),

        // Wardrobe
        head: getRandomElement(wardrobe.head),
        neck: getRandomElement(wardrobe.neck),
        torso: getRandomElement(wardrobe.torso),
        legs: getRandomElement(wardrobe.legs),
        accessory: getRandomElement(wardrobe.accessory),
        
        // Social & Bio
        socialStatus: getRandomElement(psychology.social),
        lifeGoal: getRandomElement(psychology.goals),
        motivation: getRandomElement(psychology.motivations),
        
        // Verbal
        speech: getRandomElement(speech),
        voice: getRandomElement(['Deep and Gravelly', 'Soft and Melodic', 'Raspy Whisper', 'Energetic and High-pitched', 'Calm and Monotone', 'Cheerful and Bubbly', 'Sultry and Smooth', 'Robotically Modulated', 'Slightly echoey', 'Warm and comforting']),
        scent: getRandomElement(['Fresh Rain and Pine', 'Old Books and Vanilla', 'Gunpowder and Ozone', 'Strawberries and Cream', 'Sandalwood and Spice', 'Sea Salt and Citrus', 'Coffee and Morning Mist', 'Lavender and Honey', 'Burnt Sugar and Smoke', 'Freshly Cut Grass', 'New Parchment', 'Peppermint and Snow']),

        // Physical Misc
        texture: getRandomElement(['Extremely soft', 'Coarse', 'Sleek', 'Slightly warm', 'Silky', 'Rough', 'Thick and wooly']),
        height: getRandomElement(['Remarkably tall', 'Dainty and small', 'Average/Muscular', 'Short and stout', 'Lanky', 'Compact and agile']),
        
        quirk: getRandomElement(['Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook', 'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies', 'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them', 'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail', 'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys', 'Has a holographic display on their visor', 'Wears a spiked collar', 'Has wings that are too small for flight', 'Always has headphones on', 'Is surprisingly good at cooking', 'Has a secret talent for singing', 'Purrs when happy', 'Hoards shiny objects', 'Has a distinctive scar over one eye', 'Is always covered in glitter', 'Sneezes like a kitten', 'Has tiny horns hidden in fur', 'Tail wags uncontrollably', 'Afraid of vacuum cleaners', 'Always smells like cinnamon', 'Can see ghosts', 'Collects vintage postcards', 'Can only sleep while hanging upside down'])
    };
}

module.exports = { generateFursona };
