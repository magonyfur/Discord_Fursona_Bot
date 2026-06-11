const species = [
    // Common
    'Fox', 'Wolf', 'Husky', 'German Shepherd', 'Golden Retriever', 'Border Collie',
    'Tabby Cat', 'Calico Cat', 'Siamese Cat', 'Maine Coon', 'Lion', 'Tiger', 'Leopard',
    'Snow Leopard', 'Cheetah', 'Cougar', 'Panther', 'Lynx', 'Red Panda', 'Raccoon',
    'Opossum', 'Skunk', 'Otter', 'Ferret', 'Badger', 'Rabbit', 'Hare', 'Deer', 'Elk',
    'Moose', 'Horse', 'Donkey', 'Zebra', 'Grizzly Bear', 'Polar Bear', 'Panda Bear',
    'Hyena', 'African Wild Dog', 'Coyote', 'Jackal', 'Bat', 'Fruit Bat', 'Vampire Bat',
    'Mouse', 'Rat', 'Squirrel', 'Chipmunk', 'Beaver', 'Hedgehog', 'Porcupine',
    
    // Exotic/Niche
    'Fennec Fox', 'Maned Wolf', 'Arctic Fox', 'Kitsune (Multi-tailed)', 'Tanuki',
    'Axolotl', 'Shark', 'Hammerhead Shark', 'Great White Shark', 'Orca', 'Dolphin',
    'Stingray', 'Seahorse', 'Frog', 'Toad', 'Chameleon', 'Gecko', 'Iguana', 'Snake',
    'Cobra', 'Dragon', 'Wyvern', 'Eastern Dragon', 'Western Dragon', 'Drake',
    
    // Community/Original Species
    'Protogen', 'Primagen', 'Sergal', 'Avali', 'Dutch Angel Dragon', 'Rexouium',
    'Wickerbeast', 'Manokit', 'Crux', 'Synx', 'Skull Dog', 'Doberman Skull',
    'Chakat', 'Nargacuga', 'Zinogre', 'Kirin', 'Mothman', 'Wendigo-inspired',
    
    // Mythical/Hybrid
    'Griffin', 'Hippogriff', 'Phoenix', 'Pegasus', 'Unicorn', 'Alicorn', 'Sphinx',
    'Chimera', 'Centaur-style Hybrid', 'Jackalope', 'Wolpertinger'
];

const colors = [
    'Electric Blue', 'Neon Green', 'Sunset Orange', 'Deep Purple', 'Pastel Pink',
    'Midnight Black', 'Snow White', 'Crimson Red', 'Emerald Green', 'Golden Yellow',
    'Chocolate Brown', 'Ash Gray', 'Mint Green', 'Lavender', 'Turquoise',
    'Pastel Yellow', 'Hot Pink', 'Royal Blue', 'Deep Maroon', 'Forest Green',
    'Cyan', 'Magenta', 'Silver', 'Gold', 'Iridescent Pearl', 'Ultraviolet',
    'Obsidian', 'Ivory', 'Coral', 'Teal', 'Indigo', 'Amber', 'Copper', 'Bronze',
    'Rose Gold', 'Periwinkle', 'Chartreuse', 'Vermilion', 'Cerulean', 'Slate'
];

const patterns = [
    'Solid', 'Spotted', 'Striped', 'Brindle', 'Gradient', 'Piebald', 'Rosettes',
    'Marbled', 'Speckled', 'Vibrant Markings', 'Glowing Runes', 'Starry/Galaxy',
    'Socks and Mittens', 'Underbelly Fade', 'Points (Ears/Tail/Paws)',
    'Vitiligo-style Patches', 'Dappled', 'Symmetrical Tribal Tattoos',
    'Bioluminescent Veins', 'Splattered Paint Look', 'Geometric Accents'
];

const personalities = [
    'Shy', 'Energetic', 'Grumpy', 'Mischievous', 'Clumsy', 'Sophisticated',
    'Cuddly', 'Adventurous', 'Lazy', 'Cheerful', 'Stoic', 'Sarcastic',
    'Anxious', 'Confident', 'Dreamy', 'Hyperactive', 'Gentle', 'Flirtatious',
    'Studious', 'Rebellious', 'Mysterious', 'Kind-hearted', 'Eccentric',
    'Philosophical', 'Protective', 'Ambitious', 'Carefree', 'Whimsical'
];

const aesthetics = [
    'Cyberpunk', 'Cottagecore', 'Vaporwave', 'Steampunk', 'Gothic', 'Minimalist',
    'Space Core', 'Solarpunk', 'Grunge', 'Y2K', 'Retro-Futuristic', 'Dark Academia',
    'Fairycore', 'Techwear', 'Vintage/Boho', 'Synthwave', 'Royal/Elegant'
];

const bodyTypes = [
    'Small and Nimble', 'Tall and Lanky', 'Muscular and Tough', 'Curvy and Soft',
    'Average/Athletic', 'Stocky and Strong', 'Tiny and Round', 'Lithe and Graceful',
    'Robust and Heavy-set', 'Slim and Elegant'
];

const clothingStyles = [
    'Oversized Hoodies and Beanies', 'Tactical Techwear', 'Flowy Sundresses',
    'Formal Suits and Ties', 'Casual Flannels and Jeans', 'Punk Rock Leather Jackets',
    'Wizard Robes and Capes', 'Sporty Jerseys and Shorts', 'Vintage Sweaters',
    'No Clothes (Natural Fur)', 'Armor Plating', 'Cybernetic Enhancements only',
    'Kimono/Yukata', 'Steampunk Vests and Goggles'
];

const elements = [
    'Fire/Heat', 'Water/Ice', 'Earth/Nature', 'Air/Wind', 'Electricity/Lightning',
    'Shadow/Darkness', 'Light/Holy', 'Cosmic/Starpower', 'Arcane Magic',
    'Mechanical/Technological', 'Psionic/Mind', 'Toxic/Acid'
];

const quirks = [
    'Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook',
    'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies',
    'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them',
    'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail',
    'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys',
    'Has a holographic display on their visor', 'Wears a spiked collar',
    'Has wings that are too small for flight', 'Always has headphones on',
    'Is surprisingly good at cooking', 'Has a secret talent for singing',
    'Purrs when happy (even if not a cat)', 'Hoards shiny objects',
    'Has a distinctive scar over one eye', 'Is always covered in glitter',
    'Sneezes like a kitten', 'Has tiny horns hidden in fur', 'Tail wags uncontrollably'
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
        aesthetic: getRandomElement(aesthetics),
        bodyType: getRandomElement(bodyTypes),
        clothing: getRandomElement(clothingStyles),
        element: getRandomElement(elements),
        quirk: getRandomElement(quirks)
    };
}

module.exports = { generateFursona };
