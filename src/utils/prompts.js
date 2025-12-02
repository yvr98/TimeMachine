/**
 * Generate the system prompt for time travel experience
 */
export function generateSystemPrompt(location, year, additionalContext = '') {
  const era = getEraFromYear(year);
  const formattedYear = formatYear(year);

  return `You are CHRONOS, an advanced AI time-travel guide. The traveler has just materialized at ${location.name || location} in ${formattedYear}.

Your role is to immerse them in this moment in history. Describe the experience as if they are THERE, standing in that exact place and time.

Include vivid sensory details:
- What they SEE: architecture, people, clothing, landscapes, weather, lighting
- What they HEAR: sounds of the era, languages, music, nature, machinery
- What they SMELL: cooking, industry, nature, perfumes or odors of the time
- What they FEEL: the atmosphere, tension or peace, the mood of the people

Historical context to weave in naturally:
- Who rules this land? What political climate exists?
- What daily life is like for people here
- Any major events happening around this time
- Technology and transportation of the era
- Social customs and etiquette

${additionalContext ? `Special context for this destination: ${additionalContext}` : ''}

Speak directly to the traveler in second person ("You see...", "Around you..."). Be historically accurate but dramatically engaging. Make them FEEL like they've traveled through time.

Keep your response between 200-400 words. End with a tantalizing hint about what they might explore next in this time and place.`;
}

/**
 * Generate the image prompt for the scene
 */
export function generateImagePrompt(location, year, additionalContext = '') {
  const era = getEraFromYear(year);
  const formattedYear = formatYear(year);
  const locationName = location.name || location;

  // Build a detailed image prompt
  const styleHints = getStyleHintsForEra(era);

  return `A photorealistic, cinematic scene of ${locationName} in ${formattedYear}. ${styleHints} ${additionalContext ? additionalContext : ''} Dramatic lighting, highly detailed, historical accuracy, wide angle establishing shot, 8k quality, atmospheric perspective.`;
}

/**
 * Get era name from year
 */
export function getEraFromYear(year) {
  if (year < -3000) return 'Prehistoric';
  if (year < 500) return 'Ancient';
  if (year < 1500) return 'Medieval';
  if (year < 1700) return 'Renaissance';
  if (year < 1900) return 'Industrial';
  if (year < 2000) return 'Modern';
  return 'Contemporary';
}

/**
 * Format year for display (handles BC/AD)
 */
export function formatYear(year) {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }
  if (year < 1000) {
    return `${year} AD`;
  }
  return year.toString();
}

/**
 * Get style hints for image generation based on era
 */
function getStyleHintsForEra(era) {
  const hints = {
    'Prehistoric': 'Primitive landscape, early humans, cave dwellings, megaliths, untamed wilderness.',
    'Ancient': 'Classical architecture, togas and robes, marble columns, ancient markets, temples, bustling agora.',
    'Medieval': 'Stone castles, knights, peasants, Gothic cathedrals, cobblestone streets, torchlight, banners.',
    'Renaissance': 'Ornate architecture, artistic flourishing, elaborate clothing, carriages, piazzas, paintings.',
    'Industrial': 'Steam engines, factories, Victorian fashion, gas lamps, cobblestones, smoke stacks, railways.',
    'Modern': 'Art deco, early automobiles, neon signs, jazz age or mid-century aesthetics, urban development.',
    'Contemporary': 'Modern cityscape, current technology, diverse crowds, contemporary architecture.',
  };

  return hints[era] || '';
}

/**
 * Get era boundaries for UI
 */
export const ERA_RANGES = {
  'Prehistoric': { min: -50000, max: -3001 },
  'Ancient': { min: -3000, max: 499 },
  'Medieval': { min: 500, max: 1499 },
  'Renaissance': { min: 1500, max: 1699 },
  'Industrial': { min: 1700, max: 1899 },
  'Modern': { min: 1900, max: 1999 },
  'Contemporary': { min: 2000, max: 2025 },
};

export const ERAS = Object.keys(ERA_RANGES);
