// ============================================
// POLLINATIONS API - Free & Premium Support
// Based on official docs from poliapidoc.md
// ============================================

// FREE API endpoints (no API key required!)
const FREE_TEXT_URL = 'https://text.pollinations.ai';
const FREE_IMAGE_URL = 'https://image.pollinations.ai/prompt';

// PREMIUM API endpoint (requires API key from enter.pollinations.ai)
const PREMIUM_BASE_URL = 'https://enter.pollinations.ai/api';

// ============================================
// DEFAULT MODELS (Free Tier)
// ============================================

export const DEFAULT_TEXT_MODELS = [
  { name: 'openai', description: 'GPT-4o - Fast and capable', tier: 'free' },
  { name: 'openai-large', description: 'GPT-4o Large - More detailed responses', tier: 'free' },
  { name: 'mistral', description: 'Mistral - Fast open-source model', tier: 'free' },
  { name: 'llama', description: 'Llama 3.1 - Meta\'s open model', tier: 'free' },
  { name: 'deepseek', description: 'DeepSeek - Strong reasoning', tier: 'free' },
];

export const DEFAULT_IMAGE_MODELS = [
  { name: 'flux', description: 'Flux - High quality, fast', tier: 'free' },
  { name: 'flux-realism', description: 'Flux Realism - Photorealistic images', tier: 'free' },
  { name: 'flux-anime', description: 'Flux Anime - Anime style', tier: 'free' },
  { name: 'flux-3d', description: 'Flux 3D - 3D rendered style', tier: 'free' },
  { name: 'turbo', description: 'Turbo - Very fast generation', tier: 'free' },
];

// ============================================
// TEXT GENERATION
// ============================================

/**
 * Generate text - automatically uses free or premium based on params
 */
export async function generateText(messages, model = 'openai', onChunk, apiKey = null) {
  if (apiKey) {
    return generateTextPremium(apiKey, messages, model, onChunk);
  }
  return generateTextFree(messages, model, onChunk);
}

/**
 * FREE text generation using Pollinations public endpoint
 */
async function generateTextFree(messages, model = 'openai', onChunk) {
  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const userMessage = messages.find(m => m.role === 'user')?.content || '';

  const params = new URLSearchParams({
    model,
    system: systemMessage,
  });

  const response = await fetch(`${FREE_TEXT_URL}/${encodeURIComponent(userMessage)}?${params}`);

  if (!response.ok) {
    throw new Error(`Text generation failed: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    fullText += chunk;
    if (onChunk) onChunk(chunk, fullText);
  }

  return fullText;
}

/**
 * PREMIUM text generation using enter.pollinations.ai (OpenAI-compatible)
 * Endpoint: POST /generate/v1/chat/completions
 */
async function generateTextPremium(apiKey, messages, model = 'openai', onChunk) {
  const response = await fetch(`${PREMIUM_BASE_URL}/generate/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Text generation failed: ${response.statusText} - ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            fullText += content;
            if (onChunk) onChunk(content, fullText);
          }
        } catch {
          // Skip invalid JSON chunks
        }
      }
    }
  }

  return fullText;
}

// ============================================
// IMAGE GENERATION
// ============================================

/**
 * Generate image URL for FREE mode (direct URL)
 */
export function generateImageUrl(prompt, model = 'flux', width = 1024, height = 768) {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000);
  return `${FREE_IMAGE_URL}/${encodedPrompt}?model=${model}&width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

/**
 * Generate image for PREMIUM mode using fetch with Authorization header
 * Endpoint: GET /generate/image/{prompt}
 * Returns a blob URL that can be used as image src
 */
export async function generateImagePremium(prompt, model = 'flux', width = 1024, height = 768, apiKey) {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000);

  const url = `${PREMIUM_BASE_URL}/generate/image/${encodedPrompt}?model=${model}&width=${width}&height=${height}&seed=${seed}&nologo=true`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Image generation failed: ${response.statusText}`);
  }

  // Convert response to blob and create object URL
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

// ============================================
// MODEL DISCOVERY
// ============================================

/**
 * Fetch available text models
 */
export async function fetchTextModels(apiKey = null) {
  if (apiKey) {
    return fetchTextModelsPremium(apiKey);
  }
  return fetchTextModelsFree();
}

async function fetchTextModelsFree() {
  try {
    const response = await fetch('https://text.pollinations.ai/models');
    if (response.ok) {
      const models = await response.json();
      return models.map(m => typeof m === 'string'
        ? { name: m, description: '', tier: 'free' }
        : { ...m, tier: 'free' }
      );
    }
  } catch (e) {
    console.log('Using default text models');
  }
  return DEFAULT_TEXT_MODELS;
}

/**
 * PREMIUM text models: GET /generate/v1/models or /generate/text/models
 */
async function fetchTextModelsPremium(apiKey) {
  try {
    const response = await fetch(`${PREMIUM_BASE_URL}/generate/v1/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const models = await response.json();
      return models.map(m => ({
        name: m.name,
        description: m.description || '',
        tier: m.tier || 'premium',
        ...m
      }));
    }
  } catch (e) {
    console.error('Failed to fetch premium text models:', e);
  }

  // Fall back to free models
  return fetchTextModelsFree();
}

/**
 * Fetch available image models
 */
export async function fetchImageModels(apiKey = null) {
  if (apiKey) {
    return fetchImageModelsPremium(apiKey);
  }
  return fetchImageModelsFree();
}

async function fetchImageModelsFree() {
  try {
    const response = await fetch('https://image.pollinations.ai/models');
    if (response.ok) {
      const models = await response.json();
      return models.map(m => typeof m === 'string'
        ? { name: m, description: '', tier: 'free' }
        : { ...m, tier: 'free' }
      );
    }
  } catch (e) {
    console.log('Using default image models');
  }
  return DEFAULT_IMAGE_MODELS;
}

/**
 * PREMIUM image models: GET /generate/image/models
 */
async function fetchImageModelsPremium(apiKey) {
  try {
    const response = await fetch(`${PREMIUM_BASE_URL}/generate/image/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      const models = await response.json();
      return models.map(m => ({
        name: m.name,
        description: m.description || '',
        tier: m.tier || 'premium',
        ...m
      }));
    }
  } catch (e) {
    console.error('Failed to fetch premium image models:', e);
  }

  // Fall back to free models
  return fetchImageModelsFree();
}

// ============================================
// API KEY VALIDATION
// ============================================

/**
 * Test if an API key is valid by trying to fetch models
 */
export async function testApiKey(apiKey) {
  try {
    const response = await fetch(`${PREMIUM_BASE_URL}/generate/v1/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
