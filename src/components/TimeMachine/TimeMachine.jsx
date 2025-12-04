import { useState, useCallback, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import TimeSelector from './TimeSelector'
import LocationDisplay from './LocationDisplay'
import LaunchButton from './LaunchButton'
import ModelSelector from '../ModelSelector/ModelSelector'
import Randomizer from '../Randomizer/Randomizer'
import { generateText, generateImageUrl, generateImagePremium } from '../../utils/api'
import { generateSystemPrompt, generateImagePrompt, formatYear } from '../../utils/prompts'
import './TimeMachine.css'

function TimeMachine() {
  const {
    apiKey,
    isPremium,
    selectedLocation,
    selectedYear,
    textModel,
    imageModel,
    setIsGenerating,
    setGeneratedText,
    setGeneratedImage,
    setError,
    setIsTraveling,
    clearExperience,
  } = useApp()

  const [isExpanded, setIsExpanded] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null)
  const panelRef = useRef(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  // Handle drag start
  const handleDragStart = useCallback((e) => {
    if (e.target.closest('button, input, select, .dial, .era-button, .mode-button, .event-card')) {
      return // Don't drag when interacting with controls
    }
    setIsDragging(true)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y
    }
  }, [position])

  // Handle drag move
  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      const newX = clientX - dragStartPos.current.x
      const newY = clientY - dragStartPos.current.y

      // Constrain to viewport
      const panel = panelRef.current
      if (panel) {
        const rect = panel.getBoundingClientRect()
        const maxX = window.innerWidth - rect.width / 2
        const minX = -rect.width / 2
        const maxY = window.innerHeight - 50
        const minY = -rect.height + 100

        setPosition({
          x: Math.max(minX, Math.min(maxX, newX)),
          y: Math.max(minY, Math.min(maxY, newY))
        })
      } else {
        setPosition({ x: newX, y: newY })
      }
    }

    const handleDragEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleDragMove, { passive: false })
      window.addEventListener('touchend', handleDragEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchmove', handleDragMove)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [isDragging])

  const handleTravel = useCallback(async () => {
    if (!selectedLocation) {
      setError('Please select a destination on the globe')
      return
    }

    // Clear previous experience
    clearExperience()
    setIsTraveling(true)
    setIsGenerating(true)

    // Use API key only if in premium mode
    const useApiKey = isPremium ? apiKey : null

    try {
      // Generate image prompt
      const imagePrompt = generateImagePrompt(selectedLocation, selectedYear)

      // Generate image - different approach for free vs premium
      if (isPremium && useApiKey) {
        // Premium: use fetch with auth header (async)
        generateImagePremium(imagePrompt, imageModel, 1024, 768, useApiKey)
          .then(blobUrl => setGeneratedImage(blobUrl))
          .catch(err => console.error('Premium image error:', err))
      } else {
        // Free: use direct URL
        const imageUrl = generateImageUrl(imagePrompt, imageModel, 1024, 768)
        setGeneratedImage(imageUrl)
      }

      // Generate text description
      const systemPrompt = generateSystemPrompt(selectedLocation, selectedYear)
      const userMessage = `Take me to ${selectedLocation.name || 'this location'} in ${formatYear(selectedYear)}. Describe what I see, hear, and feel as I arrive.`

      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ]

      // Start streaming text generation
      await generateText(messages, textModel, (chunk, fullText) => {
        setGeneratedText(fullText)
      }, useApiKey)

    } catch (err) {
      console.error('Travel error:', err)
      setError(err.message || 'Failed to travel through time. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }, [
    apiKey, isPremium, selectedLocation, selectedYear, textModel, imageModel,
    setIsGenerating, setGeneratedText, setGeneratedImage,
    setError, setIsTraveling, clearExperience
  ])

  return (
    <div
      ref={panelRef}
      className={`time-machine-panel ${isExpanded ? 'expanded' : 'collapsed'} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Drag handle indicator */}
      <div className="drag-handle">
        <span className="drag-dots">⋮⋮</span>
        <span className="drag-hint">Drag to move</span>
      </div>

      {/* Panel toggle */}
      <button
        className="panel-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isExpanded ? (
            <path d="M19 9l-7 7-7-7" />
          ) : (
            <path d="M5 15l7-7 7 7" />
          )}
        </svg>
      </button>

      {/* Header */}
      <div className="panel-header">
        <div className="panel-title">
          <span className="title-icon">⏱</span>
          <h1>CHRONOS</h1>
          <span className="title-version">MK.VII</span>
        </div>
        <div className="panel-status">
          <span className={`status-indicator ${isPremium ? 'premium' : 'active'}`} />
          <span className="status-text">{isPremium ? 'PREMIUM' : 'FREE'}</span>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Divider */}
          <div className="panel-divider">
            <div className="divider-line" />
            <span className="divider-label">NAVIGATION</span>
            <div className="divider-line" />
          </div>

          {/* Controls grid */}
          <div className="controls-grid">
            {/* Left column - Time controls */}
            <div className="controls-column">
              <TimeSelector />
            </div>

            {/* Right column - Location & Model */}
            <div className="controls-column">
              <LocationDisplay />
              <ModelSelector />
            </div>
          </div>

          {/* Randomizer */}
          <Randomizer />

          {/* Divider */}
          <div className="panel-divider">
            <div className="divider-line" />
            <span className="divider-label">INITIATE</span>
            <div className="divider-line" />
          </div>

          {/* Launch button */}
          <LaunchButton onLaunch={handleTravel} />
        </>
      )}
    </div>
  )
}

export default TimeMachine
