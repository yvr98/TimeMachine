import { useState, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { getRandomEvent, historicalEvents } from '../../data/historicalEvents'
import { getEraFromYear } from '../../utils/prompts'
import './Randomizer.css'

function Randomizer() {
  const { setSelectedLocation, setSelectedYear, setSelectedEra } = useApp()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventList, setShowEventList] = useState(false)

  const handleRandomize = useCallback(() => {
    setIsSpinning(true)

    // Spin through a few random events for visual effect
    let spins = 0
    const maxSpins = 8
    const spinInterval = setInterval(() => {
      const event = getRandomEvent()
      setSelectedEvent(event)
      spins++

      if (spins >= maxSpins) {
        clearInterval(spinInterval)
        setIsSpinning(false)

        // Set the final event
        setSelectedLocation(event.location)
        setSelectedYear(event.year)
        setSelectedEra(getEraFromYear(event.year))
      }
    }, 100)
  }, [setSelectedLocation, setSelectedYear, setSelectedEra])

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event)
    setSelectedLocation(event.location)
    setSelectedYear(event.year)
    setSelectedEra(getEraFromYear(event.year))
    setShowEventList(false)
  }, [setSelectedLocation, setSelectedYear, setSelectedEra])

  return (
    <div className="randomizer">
      <div className="randomizer-controls">
        <button
          className={`randomize-button ${isSpinning ? 'spinning' : ''}`}
          onClick={handleRandomize}
          disabled={isSpinning}
        >
          <span className="randomize-icon">🎲</span>
          <span className="randomize-text">
            {isSpinning ? 'LOCATING...' : 'RANDOM DESTINATION'}
          </span>
        </button>

        <button
          className="browse-button"
          onClick={() => setShowEventList(!showEventList)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>BROWSE</span>
        </button>
      </div>

      {/* Selected event preview */}
      {selectedEvent && !showEventList && (
        <div className="event-preview">
          <div className="preview-badge">DESTINATION SELECTED</div>
          <h3 className="preview-title">{selectedEvent.name}</h3>
          <div className="preview-details">
            <span className="preview-location">{selectedEvent.location.name}</span>
            <span className="preview-separator">•</span>
            <span className="preview-year">
              {selectedEvent.year < 0 ? `${Math.abs(selectedEvent.year)} BC` : `${selectedEvent.year} AD`}
            </span>
          </div>
          <p className="preview-context">{selectedEvent.context}</p>
        </div>
      )}

      {/* Event list browser */}
      {showEventList && (
        <div className="event-list-container">
          <div className="event-list-header">
            <h4>Historical Events</h4>
            <button className="close-list" onClick={() => setShowEventList(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="event-list">
            {historicalEvents.map((event) => (
              <button
                key={event.id}
                className={`event-item ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                onClick={() => handleSelectEvent(event)}
              >
                <div className="event-item-main">
                  <span className="event-name">{event.name}</span>
                  <span className="event-location">{event.location.name}</span>
                </div>
                <span className="event-year">
                  {event.year < 0 ? `${Math.abs(event.year)} BC` : event.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Randomizer
