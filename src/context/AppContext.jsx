import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'timemachine_api_key';
const MODE_KEY = 'timemachine_mode';

export function AppProvider({ children }) {
  // API Key state (optional - for premium mode)
  const [apiKey, setApiKeyState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || '';
    }
    return '';
  });

  // Mode: 'free' or 'premium'
  const [mode, setModeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(MODE_KEY);
      const savedKey = localStorage.getItem(STORAGE_KEY);
      // If they have a key saved, default to premium mode
      return savedKey ? 'premium' : (savedMode || 'free');
    }
    return 'free';
  });

  // Location state
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Time state
  const [selectedYear, setSelectedYear] = useState(1969);
  const [selectedEra, setSelectedEra] = useState('Modern');

  // Model state
  const [textModel, setTextModel] = useState('openai');
  const [imageModel, setImageModel] = useState('flux');
  const [availableTextModels, setAvailableTextModels] = useState([]);
  const [availableImageModels, setAvailableImageModels] = useState([]);

  // Experience state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState(null);

  // UI state
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);

  // Persist API key to localStorage
  const setApiKey = useCallback((key) => {
    setApiKeyState(key);
    if (typeof window !== 'undefined') {
      if (key) {
        localStorage.setItem(STORAGE_KEY, key);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Set mode and persist
  const setMode = useCallback((newMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(MODE_KEY, newMode);
    }
  }, []);

  // Check if premium mode is available (has valid API key)
  const isPremium = mode === 'premium' && apiKey;

  // Clear experience
  const clearExperience = useCallback(() => {
    setGeneratedText('');
    setGeneratedImage('');
    setError(null);
  }, []);

  // Set destination from historical event
  const setDestination = useCallback((location, year, era) => {
    setSelectedLocation(location);
    setSelectedYear(year);
    if (era) setSelectedEra(era);
  }, []);

  const value = {
    // API Key & Mode
    apiKey,
    setApiKey,
    mode,
    setMode,
    isPremium,
    showApiKeyModal,
    setShowApiKeyModal,

    // Location
    selectedLocation,
    setSelectedLocation,

    // Time
    selectedYear,
    setSelectedYear,
    selectedEra,
    setSelectedEra,

    // Models
    textModel,
    setTextModel,
    imageModel,
    setImageModel,
    availableTextModels,
    setAvailableTextModels,
    availableImageModels,
    setAvailableImageModels,

    // Experience
    isGenerating,
    setIsGenerating,
    generatedText,
    setGeneratedText,
    generatedImage,
    setGeneratedImage,
    error,
    setError,
    clearExperience,

    // UI
    isTraveling,
    setIsTraveling,

    // Helpers
    setDestination,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
