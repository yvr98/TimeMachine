import { useState, useEffect, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { fetchTextModels, fetchImageModels, DEFAULT_TEXT_MODELS, DEFAULT_IMAGE_MODELS } from '../../utils/api'
import './ModelSelector.css'

function ModelSelector() {
  const {
    apiKey,
    mode,
    setMode,
    isPremium,
    setShowApiKeyModal,
    textModel,
    setTextModel,
    imageModel,
    setImageModel,
    availableTextModels,
    setAvailableTextModels,
    availableImageModels,
    setAvailableImageModels,
  } = useApp()

  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Load models based on mode
  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true)

      try {
        const useApiKey = isPremium ? apiKey : null
        const [textModelsData, imageModelsData] = await Promise.all([
          fetchTextModels(useApiKey),
          fetchImageModels(useApiKey),
        ])

        setAvailableTextModels(textModelsData.length ? textModelsData : DEFAULT_TEXT_MODELS)
        setAvailableImageModels(imageModelsData.length ? imageModelsData : DEFAULT_IMAGE_MODELS)
      } catch (err) {
        console.error('Failed to load models, using defaults:', err)
        setAvailableTextModels(DEFAULT_TEXT_MODELS)
        setAvailableImageModels(DEFAULT_IMAGE_MODELS)
      } finally {
        setIsLoading(false)
      }
    }

    loadModels()
  }, [isPremium, apiKey, setAvailableTextModels, setAvailableImageModels])

  const getModelDescription = useCallback((models, modelName) => {
    const model = models.find(m => m.name === modelName)
    return model?.description || ''
  }, [])

  const handleModeChange = (newMode) => {
    if (newMode === 'premium' && !apiKey) {
      setShowApiKeyModal(true)
    } else {
      setMode(newMode)
    }
  }

  // Use defaults if nothing loaded yet
  const textModels = availableTextModels.length ? availableTextModels : DEFAULT_TEXT_MODELS
  const imageModels = availableImageModels.length ? availableImageModels : DEFAULT_IMAGE_MODELS

  return (
    <div className="model-selector">
      <button
        className="selector-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="toggle-label">
          <span className="label-icon">🤖</span>
          <span className="label-text">AI MODELS</span>
          {isPremium && <span className="premium-badge">PRO</span>}
        </div>
        <div className="toggle-right">
          <span className="current-models">{textModel} / {imageModel}</span>
          <svg
            className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="selector-content">
          {/* Mode Toggle */}
          <div className="mode-toggle">
            <button
              className={`mode-button ${mode === 'free' ? 'active' : ''}`}
              onClick={() => handleModeChange('free')}
            >
              <span className="mode-icon">🆓</span>
              <span className="mode-name">Free</span>
              <span className="mode-desc">No key needed</span>
            </button>
            <button
              className={`mode-button ${mode === 'premium' ? 'active' : ''} ${!apiKey ? 'locked' : ''}`}
              onClick={() => handleModeChange('premium')}
            >
              <span className="mode-icon">{apiKey ? '⚡' : '🔒'}</span>
              <span className="mode-name">Premium</span>
              <span className="mode-desc">{apiKey ? 'Unlocked' : 'Add API key'}</span>
            </button>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <span>Loading models...</span>
            </div>
          ) : (
            <>
              {/* Text Model */}
              <div className="model-group">
                <label className="model-label">
                  <span className="model-type-icon">💬</span>
                  Text Generation
                </label>
                <select
                  value={textModel}
                  onChange={(e) => setTextModel(e.target.value)}
                  className="model-select"
                >
                  {textModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} {model.tier === 'premium' ? '⚡' : ''}
                    </option>
                  ))}
                </select>
                {textModel && (
                  <p className="model-description">
                    {getModelDescription(textModels, textModel)}
                  </p>
                )}
              </div>

              {/* Image Model */}
              <div className="model-group">
                <label className="model-label">
                  <span className="model-type-icon">🎨</span>
                  Image Generation
                </label>
                <select
                  value={imageModel}
                  onChange={(e) => setImageModel(e.target.value)}
                  className="model-select"
                >
                  {imageModels.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} {model.tier === 'premium' ? '⚡' : ''}
                    </option>
                  ))}
                </select>
                {imageModel && (
                  <p className="model-description">
                    {getModelDescription(imageModels, imageModel)}
                  </p>
                )}
              </div>

              {/* Mode info */}
              <div className={`mode-notice ${isPremium ? 'premium' : 'free'}`}>
                {isPremium ? (
                  <>
                    <span className="notice-badge">⚡ PREMIUM</span>
                    <span>No rate limits • Priority access • All models</span>
                  </>
                ) : (
                  <>
                    <span className="notice-badge">🆓 FREE</span>
                    <span>Rate limited • Core models included</span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ModelSelector
