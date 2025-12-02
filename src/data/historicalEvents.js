/**
 * Curated list of notable historical events for the randomizer
 * Each event includes location coordinates, year, name, and context
 */

export const historicalEvents = [
  // Ancient Wonders & Achievements
  {
    id: 'giza-pyramid',
    name: 'Construction of the Great Pyramid',
    location: { lat: 29.9792, lng: 31.1342, name: 'Giza, Egypt' },
    year: -2560,
    era: 'Ancient',
    context: 'Witness the construction of one of the Seven Wonders of the Ancient World, with thousands of workers hauling limestone blocks.',
  },
  {
    id: 'athens-parthenon',
    name: 'Completion of the Parthenon',
    location: { lat: 37.9715, lng: 23.7267, name: 'Athens, Greece' },
    year: -432,
    era: 'Ancient',
    context: 'The golden age of Pericles. The crowning achievement of Classical Greek architecture stands newly completed.',
  },
  {
    id: 'babylon-gardens',
    name: 'Hanging Gardens of Babylon',
    location: { lat: 32.5363, lng: 44.4209, name: 'Babylon, Mesopotamia' },
    year: -600,
    era: 'Ancient',
    context: 'The legendary terraced gardens, one of the Seven Wonders, at the height of Babylonian power.',
  },
  {
    id: 'lighthouse-alexandria',
    name: 'Lighthouse of Alexandria',
    location: { lat: 31.2135, lng: 29.8853, name: 'Alexandria, Egypt' },
    year: -280,
    era: 'Ancient',
    context: 'The great Pharos lighthouse, one of the tallest structures in the ancient world, guides ships into harbor.',
  },
  {
    id: 'colossus-rhodes',
    name: 'Colossus of Rhodes',
    location: { lat: 36.4510, lng: 28.2278, name: 'Rhodes, Greece' },
    year: -280,
    era: 'Ancient',
    context: 'The massive bronze statue of Helios towers over the harbor, celebrating victory and freedom.',
  },
  {
    id: 'library-alexandria',
    name: 'Library of Alexandria at its Peak',
    location: { lat: 31.2001, lng: 29.9187, name: 'Alexandria, Egypt' },
    year: -250,
    era: 'Ancient',
    context: 'The greatest repository of knowledge in the ancient world. Scholars from across the Mediterranean gather here.',
  },
  {
    id: 'terracotta-army',
    name: 'Burial of the Terracotta Army',
    location: { lat: 34.3848, lng: 109.2734, name: 'Xi\'an, China' },
    year: -210,
    era: 'Ancient',
    context: 'Emperor Qin Shi Huang\'s tomb is sealed. 8,000 clay soldiers stand guard for eternity.',
  },
  {
    id: 'roman-colosseum',
    name: 'Opening of the Colosseum',
    location: { lat: 41.8902, lng: 12.4922, name: 'Rome, Italy' },
    year: 80,
    era: 'Ancient',
    context: 'The Flavian Amphitheatre opens with 100 days of games. The greatest arena ever built.',
  },
  {
    id: 'great-wall-completion',
    name: 'Great Wall of China Extension',
    location: { lat: 40.4319, lng: 116.5704, name: 'Badaling, China' },
    year: -210,
    era: 'Ancient',
    context: 'The First Emperor connects existing walls into one great barrier. An engineering marvel stretches across mountains.',
  },

  // Medieval Marvels
  {
    id: 'notre-dame',
    name: 'Completion of Notre-Dame',
    location: { lat: 48.8530, lng: 2.3499, name: 'Paris, France' },
    year: 1345,
    era: 'Medieval',
    context: 'After nearly 200 years of construction, the cathedral stands complete in all its Gothic glory.',
  },
  {
    id: 'angkor-wat',
    name: 'Dedication of Angkor Wat',
    location: { lat: 13.4125, lng: 103.8670, name: 'Angkor, Cambodia' },
    year: 1150,
    era: 'Medieval',
    context: 'The largest religious monument in the world is dedicated to the god Vishnu.',
  },
  {
    id: 'machu-picchu',
    name: 'Construction of Machu Picchu',
    location: { lat: -13.1631, lng: -72.5450, name: 'Machu Picchu, Peru' },
    year: 1450,
    era: 'Medieval',
    context: 'High in the Andes, the Inca build their sacred citadel in the clouds.',
  },
  {
    id: 'hagia-sophia',
    name: 'Completion of Hagia Sophia',
    location: { lat: 41.0086, lng: 28.9802, name: 'Constantinople' },
    year: 537,
    era: 'Medieval',
    context: 'Emperor Justinian\'s masterpiece is complete. "Solomon, I have surpassed thee!"',
  },
  {
    id: 'viking-vinland',
    name: 'Vikings Reach North America',
    location: { lat: 51.5961, lng: -55.5328, name: 'L\'Anse aux Meadows, Newfoundland' },
    year: 1000,
    era: 'Medieval',
    context: 'Leif Erikson\'s expedition lands in Vinland. Europeans reach the New World 500 years before Columbus.',
  },
  {
    id: 'marco-polo-china',
    name: 'Marco Polo at Kublai Khan\'s Court',
    location: { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
    year: 1275,
    era: 'Medieval',
    context: 'The Venetian merchant arrives at the court of the Great Khan. East meets West.',
  },
  {
    id: 'gutenberg-press',
    name: 'Gutenberg Prints the First Bible',
    location: { lat: 49.9929, lng: 8.2473, name: 'Mainz, Germany' },
    year: 1455,
    era: 'Medieval',
    context: 'The printing press roars to life. The information revolution begins.',
  },
  {
    id: 'taj-mahal',
    name: 'Completion of the Taj Mahal',
    location: { lat: 27.1751, lng: 78.0421, name: 'Agra, India' },
    year: 1653,
    era: 'Renaissance',
    context: 'Shah Jahan\'s monument to love stands complete. White marble gleams in the morning light.',
  },

  // Renaissance & Exploration
  {
    id: 'sistine-chapel',
    name: 'Michelangelo Completes the Sistine Chapel',
    location: { lat: 41.9029, lng: 12.4545, name: 'Vatican City' },
    year: 1512,
    era: 'Renaissance',
    context: 'Four years of work on scaffolding. The ceiling that would define Renaissance art is finally revealed.',
  },
  {
    id: 'shakespeare-globe',
    name: 'Opening of the Globe Theatre',
    location: { lat: 51.5081, lng: -0.0972, name: 'London, England' },
    year: 1599,
    era: 'Renaissance',
    context: 'The wooden O opens its doors. Shakespeare himself treads the boards.',
  },
  {
    id: 'galileo-telescope',
    name: 'Galileo Observes Jupiter\'s Moons',
    location: { lat: 45.4064, lng: 11.8768, name: 'Padua, Italy' },
    year: 1610,
    era: 'Renaissance',
    context: 'Through his telescope, Galileo sees what no human has seen before. The heavens will never be the same.',
  },
  {
    id: 'mona-lisa',
    name: 'Leonardo Completes the Mona Lisa',
    location: { lat: 43.7696, lng: 11.2558, name: 'Florence, Italy' },
    year: 1517,
    era: 'Renaissance',
    context: 'The master adds the final brushstrokes to his enigmatic portrait.',
  },
  {
    id: 'magellan-circumnavigation',
    name: 'First Circumnavigation of Earth',
    location: { lat: 36.5298, lng: -6.2926, name: 'Sanlúcar de Barrameda, Spain' },
    year: 1522,
    era: 'Renaissance',
    context: 'The Victoria returns with 18 survivors. Humanity has sailed around the world.',
  },
  {
    id: 'newton-apple',
    name: 'Newton\'s Principia Published',
    location: { lat: 52.2053, lng: 0.1218, name: 'Cambridge, England' },
    year: 1687,
    era: 'Renaissance',
    context: 'The laws of motion and gravity are revealed. The scientific revolution reaches its peak.',
  },

  // Industrial Wonders
  {
    id: 'steam-engine',
    name: 'Watt\'s Steam Engine Demonstration',
    location: { lat: 52.4862, lng: -1.8904, name: 'Birmingham, England' },
    year: 1776,
    era: 'Industrial',
    context: 'James Watt\'s improved steam engine powers the Industrial Revolution into being.',
  },
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower Opening',
    location: { lat: 48.8584, lng: 2.2945, name: 'Paris, France' },
    year: 1889,
    era: 'Industrial',
    context: 'The World\'s Fair. The controversial iron tower opens. Paris will never look the same.',
  },
  {
    id: 'crystal-palace',
    name: 'Opening of the Great Exhibition',
    location: { lat: 51.5024, lng: -0.1745, name: 'London, England' },
    year: 1851,
    era: 'Industrial',
    context: 'The Crystal Palace gleams in Hyde Park. The world\'s first World\'s Fair dazzles visitors.',
  },
  {
    id: 'golden-spike',
    name: 'Completion of Transcontinental Railroad',
    location: { lat: 41.6179, lng: -112.5476, name: 'Promontory Summit, Utah' },
    year: 1869,
    era: 'Industrial',
    context: 'The golden spike is driven. East meets West. America is connected by rail.',
  },
  {
    id: 'statue-liberty',
    name: 'Dedication of the Statue of Liberty',
    location: { lat: 40.6892, lng: -74.0445, name: 'New York Harbor, USA' },
    year: 1886,
    era: 'Industrial',
    context: 'Lady Liberty lifts her torch for the first time. A beacon of hope for millions.',
  },
  {
    id: 'brooklyn-bridge',
    name: 'Opening of the Brooklyn Bridge',
    location: { lat: 40.7061, lng: -73.9969, name: 'New York City, USA' },
    year: 1883,
    era: 'Industrial',
    context: 'The eighth wonder of the world. The greatest bridge ever built opens to awestruck crowds.',
  },
  {
    id: 'first-photograph',
    name: 'First Photograph Ever Taken',
    location: { lat: 46.9883, lng: 4.8343, name: 'Saint-Loup-de-Varennes, France' },
    year: 1826,
    era: 'Industrial',
    context: 'Nicéphore Niépce captures light on a pewter plate. The world can now be frozen in time.',
  },
  {
    id: 'london-underground',
    name: 'Opening of the London Underground',
    location: { lat: 51.5229, lng: -0.1568, name: 'London, England' },
    year: 1863,
    era: 'Industrial',
    context: 'The world\'s first underground railway. Steam trains rumble beneath the city streets.',
  },

  // Modern Achievements
  {
    id: 'wright-brothers',
    name: 'First Powered Flight',
    location: { lat: 36.0176, lng: -75.6716, name: 'Kitty Hawk, North Carolina' },
    year: 1903,
    era: 'Modern',
    context: 'December 17th. Twelve seconds that changed transportation forever.',
  },
  {
    id: 'moon-landing',
    name: 'Apollo 11 Moon Landing',
    location: { lat: 0.6875, lng: 23.4333, name: 'Sea of Tranquility, Moon' },
    year: 1969,
    era: 'Modern',
    context: 'One small step. The lunar module Eagle touches down. Humanity reaches another world.',
  },
  {
    id: 'einstein-relativity',
    name: 'Einstein Publishes Special Relativity',
    location: { lat: 46.9480, lng: 7.4474, name: 'Bern, Switzerland' },
    year: 1905,
    era: 'Modern',
    context: 'A patent clerk rewrites the laws of physics. E=mc². The universe will never be understood the same way.',
  },
  {
    id: 'dna-discovery',
    name: 'Discovery of DNA Structure',
    location: { lat: 52.2053, lng: 0.1218, name: 'Cambridge, England' },
    year: 1953,
    era: 'Modern',
    context: 'Watson and Crick announce the double helix. The blueprint of life is revealed.',
  },
  {
    id: 'titanic-departure',
    name: 'RMS Titanic Departing Southampton',
    location: { lat: 50.8998, lng: -1.4044, name: 'Southampton, England' },
    year: 1912,
    era: 'Modern',
    context: 'April 10th. The grandest ocean liner ever built embarks on her maiden voyage. Crowds cheer from the dock.',
  },
  {
    id: 'berlin-wall-fall',
    name: 'Fall of the Berlin Wall',
    location: { lat: 52.5163, lng: 13.3777, name: 'Berlin, Germany' },
    year: 1989,
    era: 'Modern',
    context: 'November 9th. The gates open. East meets West. Families reunited after 28 years.',
  },
  {
    id: 'woodstock',
    name: 'Woodstock Festival',
    location: { lat: 41.7031, lng: -74.8795, name: 'Bethel, New York' },
    year: 1969,
    era: 'Modern',
    context: 'Three days of peace and music. Half a million people gather on a farm.',
  },
  {
    id: 'beatles-ed-sullivan',
    name: 'The Beatles on Ed Sullivan',
    location: { lat: 40.7614, lng: -73.9776, name: 'New York City, USA' },
    year: 1964,
    era: 'Modern',
    context: 'February 9th. 73 million Americans tune in. The British Invasion begins.',
  },
  {
    id: 'kennedy-moon-speech',
    name: 'JFK\'s Moon Speech',
    location: { lat: 29.7508, lng: -95.3590, name: 'Houston, Texas' },
    year: 1962,
    era: 'Modern',
    context: '"We choose to go to the Moon." Rice Stadium. The space race accelerates.',
  },
  {
    id: 'lindbergh-flight',
    name: 'Lindbergh Lands in Paris',
    location: { lat: 49.0097, lng: 2.5479, name: 'Le Bourget, Paris' },
    year: 1927,
    era: 'Modern',
    context: '33.5 hours across the Atlantic. 150,000 Parisians rush the airfield. The Lone Eagle has landed.',
  },
  {
    id: 'world-cup-1950',
    name: '1950 World Cup Final',
    location: { lat: -22.9121, lng: -43.2302, name: 'Rio de Janeiro, Brazil' },
    year: 1950,
    era: 'Modern',
    context: 'Maracanã Stadium. 200,000 fans witness the beautiful game at its peak.',
  },
  {
    id: 'first-movie',
    name: 'First Public Film Screening',
    location: { lat: 48.8712, lng: 2.3418, name: 'Paris, France' },
    year: 1895,
    era: 'Modern',
    context: 'The Lumière brothers project moving images. Audiences gasp as a train approaches.',
  },
  {
    id: 'radio-broadcast',
    name: 'First Commercial Radio Broadcast',
    location: { lat: 40.4406, lng: -79.9959, name: 'Pittsburgh, Pennsylvania' },
    year: 1920,
    era: 'Modern',
    context: 'KDKA broadcasts election returns. The age of mass media begins.',
  },
  {
    id: 'first-television',
    name: 'First Television Demonstration',
    location: { lat: 51.5074, lng: -0.1278, name: 'London, England' },
    year: 1926,
    era: 'Modern',
    context: 'John Logie Baird demonstrates the first television. The world will never look away.',
  },
  {
    id: 'penicillin-discovery',
    name: 'Discovery of Penicillin',
    location: { lat: 51.5200, lng: -0.1746, name: 'London, England' },
    year: 1928,
    era: 'Modern',
    context: 'Alexander Fleming notices a mold killing bacteria. Medicine is about to change forever.',
  },
  {
    id: 'first-computer',
    name: 'ENIAC Unveiled',
    location: { lat: 39.9522, lng: -75.1932, name: 'Philadelphia, Pennsylvania' },
    year: 1946,
    era: 'Modern',
    context: 'The first general-purpose electronic computer. 30 tons of machine that will change everything.',
  },
  {
    id: 'sputnik-launch',
    name: 'Sputnik 1 Launch',
    location: { lat: 45.9200, lng: 63.3421, name: 'Baikonur, Kazakhstan' },
    year: 1957,
    era: 'Modern',
    context: 'Beep... beep... beep. The first artificial satellite orbits Earth. The Space Age begins.',
  },
  {
    id: 'everest-summit',
    name: 'First Summit of Mount Everest',
    location: { lat: 27.9881, lng: 86.9250, name: 'Mount Everest, Nepal' },
    year: 1953,
    era: 'Modern',
    context: 'Hillary and Tenzing stand on top of the world. The highest point on Earth is conquered.',
  },
  {
    id: 'first-heart-transplant',
    name: 'First Heart Transplant',
    location: { lat: -33.9413, lng: 18.4629, name: 'Cape Town, South Africa' },
    year: 1967,
    era: 'Modern',
    context: 'Dr. Christiaan Barnard performs the impossible. A human heart beats in a new chest.',
  },
  {
    id: 'world-wide-web',
    name: 'World Wide Web Goes Public',
    location: { lat: 46.2336, lng: 6.0523, name: 'CERN, Geneva' },
    year: 1991,
    era: 'Modern',
    context: 'Tim Berners-Lee\'s creation opens to the world. The internet as we know it is born.',
  },
  {
    id: 'hubble-launch',
    name: 'Hubble Space Telescope Launch',
    location: { lat: 28.5729, lng: -80.6490, name: 'Kennedy Space Center, Florida' },
    year: 1990,
    era: 'Modern',
    context: 'A telescope in orbit. Humanity gains new eyes to see the universe.',
  },
  {
    id: 'channel-tunnel',
    name: 'Channel Tunnel Opens',
    location: { lat: 51.0928, lng: 1.2069, name: 'English Channel' },
    year: 1994,
    era: 'Modern',
    context: 'Britain and France are connected beneath the sea. A centuries-old dream realized.',
  },
  {
    id: 'sydney-opera',
    name: 'Sydney Opera House Opens',
    location: { lat: -33.8568, lng: 151.2153, name: 'Sydney, Australia' },
    year: 1973,
    era: 'Modern',
    context: 'The white sails rise over the harbor. A masterpiece of modern architecture.',
  },
  {
    id: 'panama-canal',
    name: 'Panama Canal Opens',
    location: { lat: 9.0801, lng: -79.6805, name: 'Panama Canal' },
    year: 1914,
    era: 'Modern',
    context: 'The seas are connected. Ships sail through a continent. Engineering triumph over nature.',
  },
];

/**
 * Get a random historical event
 */
export function getRandomEvent() {
  const index = Math.floor(Math.random() * historicalEvents.length);
  return historicalEvents[index];
}

/**
 * Get events by era
 */
export function getEventsByEra(era) {
  return historicalEvents.filter(event => event.era === era);
}

/**
 * Search events by keyword
 */
export function searchEvents(query) {
  const lowerQuery = query.toLowerCase();
  return historicalEvents.filter(event =>
    event.name.toLowerCase().includes(lowerQuery) ||
    event.location.name.toLowerCase().includes(lowerQuery) ||
    event.context.toLowerCase().includes(lowerQuery)
  );
}

export default historicalEvents;
