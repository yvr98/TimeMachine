import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { testApiKey } from '../../utils/api'
import './ApiKeyInput.css'

function ApiKeyInput() {
  const { apiKey, setApiKey, setShowApiKeyModal } = useApp()
  const [inputValue, setInputValue] = useState(apiKey)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) {
      setError('Please enter an API key')
      return
    }

    setIsValidating(true)
    setError('')

    try {
      const isValid = await testApiKey(inputValue.trim())
      if (isValid) {
        setApiKey(inputValue.trim())
        setShowApiKeyModal(false)
      } else {
        setError('Invalid API key. Please check and try again.')
      }
    } catch (err) {
      setError('Could not validate key. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSkip = () => {
    setShowApiKeyModal(false)
  }

  return (
    <div className="api-key-modal-overlay">
      <div className="api-key-modal">
        <div className="modal-glow" />

        <div className="modal-header">
          <div className="modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <h2>Initialize Time Machine</h2>
          <p className="modal-subtitle">Enter your Pollinations API key to power the temporal engines</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="apiKey">API Key</label>
            <div className="input-wrapper">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="pk_... or sk_..."
                autoFocus
                autoComplete="off"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowKey(!showKey)}
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="security-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Your key is stored locally in your browser and never sent to any server except Pollinations.ai</span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleSkip}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isValidating}
            >
              {isValidating ? (
                <>
                  <span className="spinner" />
                  Validating...
                </>
              ) : (
                <>
                  <span className="btn-icon">⚡</span>
                  Activate
                </>
              )}
            </button>
          </div>
        </form>

        <div className="modal-footer">
          <a href="https://enter.pollinations.ai" target="_blank" rel="noopener noreferrer">
            Get an API key from enter.pollinations.ai
          </a>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyInput
