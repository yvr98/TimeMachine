import { useState, useCallback, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { ERAS, ERA_RANGES, formatYear, getEraFromYear } from '../../utils/prompts'
import './TimeSelector.css'

function TimeSelector() {
  const { selectedYear, setSelectedYear, selectedEra, setSelectedEra } = useApp()
  const [isDragging, setIsDragging] = useState(false)

  // Calculate dial rotation based on year
  const dialRotation = useMemo(() => {
    const range = ERA_RANGES[selectedEra]
    if (!range) return 0

    const normalizedPosition = (selectedYear - range.min) / (range.max - range.min)
    return normalizedPosition * 270 - 135 // -135 to 135 degrees
  }, [selectedYear, selectedEra])

  // Handle era change
  const handleEraChange = useCallback((era) => {
    setSelectedEra(era)
    const range = ERA_RANGES[era]
    // Set year to middle of era
    const middleYear = Math.floor((range.min + range.max) / 2)
    setSelectedYear(middleYear)
  }, [setSelectedEra, setSelectedYear])

  // Handle dial interaction
  const handleDialClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)

    // Convert angle to year
    const range = ERA_RANGES[selectedEra]
    const normalizedAngle = ((angle + 135) / 270)
    const clampedNormalized = Math.max(0, Math.min(1, normalizedAngle))
    const year = Math.round(range.min + clampedNormalized * (range.max - range.min))
    setSelectedYear(year)
  }, [selectedEra, setSelectedYear])

  // Handle direct year input
  const handleYearInput = useCallback((e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setSelectedYear(value)
      setSelectedEra(getEraFromYear(value))
    }
  }, [setSelectedYear, setSelectedEra])

  // Generate tick marks
  const tickMarks = useMemo(() => {
    const ticks = []
    for (let i = 0; i <= 12; i++) {
      const angle = (i * 22.5) - 135
      const isMain = i % 3 === 0
      ticks.push(
        <div
          key={i}
          className={`dial-tick ${isMain ? 'main' : ''}`}
          style={{ transform: `rotate(${angle}deg)` }}
        />
      )
    }
    return ticks
  }, [])

  return (
    <div className="time-selector">
      <div className="selector-label">
        <span className="label-icon">⏰</span>
        <span className="label-text">TEMPORAL COORDINATES</span>
      </div>

      {/* Era selector */}
      <div className="era-selector">
        {ERAS.map((era) => (
          <button
            key={era}
            className={`era-button ${selectedEra === era ? 'active' : ''}`}
            onClick={() => handleEraChange(era)}
          >
            {era}
          </button>
        ))}
      </div>

      {/* Dial control */}
      <div className="dial-container">
        <div
          className="dial"
          onClick={handleDialClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Tick marks */}
          <div className="dial-ticks">
            {tickMarks}
          </div>

          {/* Dial face */}
          <div className="dial-face">
            <div
              className="dial-needle"
              style={{ transform: `rotate(${dialRotation}deg)` }}
            >
              <div className="needle-glow" />
            </div>
            <div className="dial-center">
              <div className="center-ring" />
            </div>
          </div>

          {/* Glow effect */}
          <div className="dial-glow" />
        </div>

        {/* Year display */}
        <div className="year-display">
          <input
            type="number"
            value={selectedYear}
            onChange={handleYearInput}
            className="year-input"
            min={-50000}
            max={2025}
          />
          <span className="year-formatted">{formatYear(selectedYear)}</span>
        </div>
      </div>

      {/* Era range indicator */}
      <div className="era-range">
        <span>{formatYear(ERA_RANGES[selectedEra]?.min || 0)}</span>
        <div className="range-bar">
          <div
            className="range-progress"
            style={{
              width: `${((selectedYear - ERA_RANGES[selectedEra]?.min) / (ERA_RANGES[selectedEra]?.max - ERA_RANGES[selectedEra]?.min)) * 100}%`
            }}
          />
        </div>
        <span>{formatYear(ERA_RANGES[selectedEra]?.max || 2025)}</span>
      </div>
    </div>
  )
}

export default TimeSelector
