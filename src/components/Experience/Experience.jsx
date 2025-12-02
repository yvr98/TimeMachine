import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { formatYear } from '../../utils/prompts'
import './Experience.css'

function Experience() {
  const {
    selectedLocation,
    selectedYear,
    generatedText,
    generatedImage,
    isGenerating,
    error,
    setIsTraveling,
    clearExperience,
  } = useApp()

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const textRef = useRef(null)

  // Auto-scroll text as it streams in
  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight
    }
  }, [generatedText])

  const handleClose = () => {
    setIsTraveling(false)
    clearExperience()
  }

  return (
    <div className="experience">
      {/* Header */}
      <div className="experience-header">
        <div className="header-info">
          <div className="destination-badge">
            <span className="badge-icon">⏱</span>
            <span className="badge-text">TEMPORAL ARRIVAL</span>
          </div>
          <h2 className="destination-name">
            {selectedLocation?.name || 'Unknown Location'}
          </h2>
          <div className="destination-time">
            <span className="time-value">{formatYear(selectedYear)}</span>
          </div>
        </div>

        <button className="close-button" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span>EXIT</span>
        </button>
      </div>

      {/* Main content */}
      <div className="experience-content">
        {/* Image panel */}
        <div className="image-panel">
          {isGenerating && !generatedImage && (
            <div className="image-loading">
              <div className="loading-animation">
                <div className="warp-ring ring-1" />
                <div className="warp-ring ring-2" />
                <div className="warp-ring ring-3" />
                <div className="warp-core" />
              </div>
              <span className="loading-text">RENDERING TEMPORAL SNAPSHOT</span>
            </div>
          )}

          {generatedImage && !imageError && (
            <>
              <img
                src={generatedImage}
                alt={`${selectedLocation?.name} in ${formatYear(selectedYear)}`}
                className={`experience-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="image-loading">
                  <div className="loading-spinner" />
                  <span className="loading-text">MATERIALIZING IMAGE</span>
                </div>
              )}
            </>
          )}

          {imageError && (
            <div className="image-error">
              <span className="error-icon">⚠️</span>
              <span>Failed to render temporal image</span>
            </div>
          )}

          {/* Image overlay decorations */}
          <div className="image-overlay">
            <div className="corner tl" />
            <div className="corner tr" />
            <div className="corner bl" />
            <div className="corner br" />
          </div>

          {/* Scanlines effect */}
          <div className="scanlines" />
        </div>

        {/* Text panel */}
        <div className="text-panel">
          <div className="text-header">
            <span className="text-badge">CHRONOS REPORT</span>
            {isGenerating && (
              <span className="streaming-indicator">
                <span className="dot" />
                RECEIVING TRANSMISSION
              </span>
            )}
          </div>

          <div className="text-content" ref={textRef}>
            {error ? (
              <div className="text-error">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            ) : generatedText ? (
              <p className="experience-text">
                {generatedText}
                {isGenerating && <span className="cursor">|</span>}
              </p>
            ) : isGenerating ? (
              <div className="text-loading">
                <div className="typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>Analyzing temporal coordinates...</span>
              </div>
            ) : null}
          </div>

          {/* Text decorations */}
          <div className="text-decoration left" />
          <div className="text-decoration right" />
        </div>
      </div>

      {/* Footer */}
      <div className="experience-footer">
        <div className="footer-stats">
          <div className="stat">
            <span className="stat-label">COORDINATES</span>
            <span className="stat-value">
              {selectedLocation?.lat.toFixed(2)}° / {selectedLocation?.lng.toFixed(2)}°
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">TEMPORAL OFFSET</span>
            <span className="stat-value">
              {Math.abs(new Date().getFullYear() - selectedYear)} years
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">STATUS</span>
            <span className={`stat-value ${isGenerating ? 'active' : 'complete'}`}>
              {isGenerating ? 'IN TRANSIT' : 'ARRIVED'}
            </span>
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="experience-bg">
        <div className="bg-gradient" />
        <div className="bg-particles" />
      </div>
    </div>
  )
}

export default Experience
