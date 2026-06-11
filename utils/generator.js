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

const psychology = {
    motivations: ['Finding a lost family heirloom', 'Becoming the greatest chef in the land', 'Proving everyone wrong', 'Protecting a small, hidden village', 'Solving a mystery from their childhood', 'Achieving inner peace through meditation', 'Building a massive collection of technology', 'Traveling to every corner of the world', 'Atoning for a past mistake'],
    flaws: ['Overly trusting', 'Terrified of being alone', 'Stops to look at every shiny thing', 'Gets distracted by food easily', 'Can\'t say no to a dare', 'Stubborn to a fault', 'Extremely pessimistic', 'Always late to everything', 'Forgetful of important names'],
    fears: ['Wide open spaces', 'The sound of ticking clocks', 'Being forgotten', 'Deep water', 'Crowded cities', 'Complete silence', 'Failing those who depend on them', 'Spiders (even tiny ones)', 'Losing their magic/abilities']
};

const physicalNuances = {
    scars: ['Jagged scar on left shoulder', 'Missing the tip of an ear', 'Burn marks on paws', 'Small scar across the bridge of the nose', 'Old battle scar on the flank', 'Perfectly symmetrical surgical scars', 'Faded scar through one eyebrow'],
    texture: ['Extremely soft and velvet-like', 'Coarse and weather-beaten', 'Sleek and waterproof', 'Always feels slightly warm', 'Silky and shimmering', 'Rough like sandpaper in places', 'Thick and wooly'],
    height: ['Remarkably tall and imposing', 'Dainty and small-statured', 'Average height but very muscular', 'Short and stout', 'Lanky and awkward', 'Compact and agile']
};

const abilities = {
    powers: ['Can speak to insects', 'Leaves glowing footprints', 'Can manipulate small shadows', 'Immune to extreme cold', 'Can predict the weather accurately', 'Can change the color of their fur at will', 'Never gets tired from running', 'Can summon a tiny rain cloud'],
    skills: ['Expert lockpicker', 'Master of the acoustic guitar', 'Incredible at competitive baking', 'Speaks seven different languages', 'Can fix any machine with just a screwdriver', 'Perfect internal compass', 'Prodigy at chess']
};

const lore = {
    secrets: ['Once stole a royal jewel and returned it anonymously', 'Is actually from a different timeline', 'Can\'t swim despite being an aquatic species', 'Has a secret crush on their rival', 'The markings on their fur are actually a map', 'Used to be a high-ranking official but quit to be a baker'],
    items: ['A compass that points to what you desire most', 'A heavily worn leather journal', 'A small mechanical bird that chirps', 'An ancient, rusted key worn as a necklace', 'A bag of infinite (but slightly stale) crackers', 'A glowing blue crystal shard']
};

const habitatLore = [
    'Neon-drenched Megacity', 'Ancient Enchanted Forest', 'Floating Island', 'Deep Sea Colony', 'Underground Bunker', 'Desert Oasis', 'Asteroid Belt Station', 'Cozy Mountain Cabin', 'Cloud Kingdom', 'Crystal Caves', 'Post-Apocalyptic Wasteland', 'Victorian-era Village', 'High-tech Space Laboratory', 'Sunken Pirate Ship', 'Endless Field of Lavender', 'Volcanic Fortress'
];

const scents = ['Fresh Rain and Pine', 'Old Books and Vanilla', 'Gunpowder and Ozone', 'Strawberries and Cream', 'Sandalwood and Spice', 'Sea Salt and Citrus', 'Coffee and Morning Mist', 'Lavender and Honey', 'Burnt Sugar and Smoke', 'Freshly Cut Grass', 'New Parchment', 'Peppermint and Snow'];
const voices = ['Deep and Gravelly', 'Soft and Melodic', 'Raspy Whisper', 'Energetic and High-pitched', 'Calm and Monotone', 'Cheerful and Bubbly', 'Sultry and Smooth', 'Robotically Modulated', 'Slightly echoey', 'Warm and comforting'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
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
        
        // Physical Nuance
        height: getRandomElement(physicalFeatures.height),
        texture: getRandomElement(physicalNuances.texture),
        scar: getRandomElement(physicalNuances.scars),
        
        // Psychology
        motivation: getRandomElement(psychology.motivations),
        flaw: getRandomElement(psychology.flaws),
        fear: getRandomElement(psychology.fears),
        
        // Lore
        secret: getRandomElement(lore.secrets),
        item: getRandomElement(lore.items),
        habitat: getRandomElement(habitatLore),
        
        // Abilities
        power: getRandomElement(abilities.powers),
        skill: getRandomElement(abilities.skills),
        
        // Sensory
        scent: getRandomElement(scents),
        voice: getRandomElement(voices),
        
        quirk: getRandomElement(['Wears a colorful bandana', 'Has a mechanical arm', 'Always carries a sketchbook', 'Loves drinking coffee', 'Has glow-in-the-dark markings', 'Wears oversized hoodies', 'Is a huge fan of retro games', 'Has mismatched eyes', 'Always has a plushie with them', 'Talks to plants', 'Is obsessed with space', 'Has a very long, fluffy tail', 'Wears round glasses', 'Has a collection of shiny rocks', 'Can never find their keys', 'Has a holographic display on their visor', 'Wears a spiked collar', 'Has wings that are too small for flight', 'Always has headphones on', 'Is surprisingly good at cooking', 'Has a secret talent for singing', 'Purrs when happy', 'Hoards shiny objects', 'Has a distinctive scar over one eye', 'Is always covered in glitter', 'Sneezes like a kitten', 'Has tiny horns hidden in fur', 'Tail wags uncontrollably', 'Afraid of vacuum cleaners', 'Always smells like cinnamon', 'Can see ghosts', 'Collects vintage postcards', 'Can only sleep while hanging upside down'])
    };
}

module.exports = { generateFursona };
