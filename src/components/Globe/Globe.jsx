import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import ReactGlobe from 'react-globe.gl'
import { useApp } from '../../context/AppContext'
import { historicalEvents } from '../../data/historicalEvents'
import './Globe.css'

function Globe() {
  const globeRef = useRef()
  const containerRef = useRef()
  const { selectedLocation, setSelectedLocation, selectedYear } = useApp()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Configure globe on mount
  useEffect(() => {
    if (globeRef.current) {
      // Set initial view
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0)

      // Auto-rotate
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.3
        controls.enableZoom = true
        controls.minDistance = 150
        controls.maxDistance = 500
      }
    }
  }, [])

  // Stop rotation when location is selected
  useEffect(() => {
    if (globeRef.current && selectedLocation) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = false
      }
      // Fly to selected location
      globeRef.current.pointOfView(
        { lat: selectedLocation.lat, lng: selectedLocation.lng, altitude: 1.8 },
        1000
      )
    }
  }, [selectedLocation])

  // Handle globe click
  const handleGlobeClick = useCallback(({ lat, lng }) => {
    setSelectedLocation({
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      name: `${lat.toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`,
    })
  }, [setSelectedLocation])

  // Historical event markers
  const markers = useMemo(() => {
    return historicalEvents.map(event => ({
      lat: event.location.lat,
      lng: event.location.lng,
      name: event.name,
      location: event.location.name,
      year: event.year,
      size: 0.5,
      color: hoveredPoint?.name === event.name ? '#00fff7' : '#d4a84b',
    }))
  }, [hoveredPoint])

  // Ring for selected location
  const selectedRing = useMemo(() => {
    if (!selectedLocation) return []
    return [{
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      maxR: 3,
      propagationSpeed: 2,
      repeatPeriod: 1000,
    }]
  }, [selectedLocation])

  // Custom point label
  const getPointLabel = useCallback((point) => {
    return `
      <div class="globe-tooltip">
        <div class="tooltip-title">${point.name}</div>
        <div class="tooltip-location">${point.location}</div>
        <div class="tooltip-year">${point.year < 0 ? Math.abs(point.year) + ' BC' : point.year + ' AD'}</div>
      </div>
    `
  }, [])

  return (
    <div ref={containerRef} className="globe-wrapper">
      {dimensions.width > 0 && (
        <ReactGlobe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          atmosphereColor="#00b8b2"
          atmosphereAltitude={0.25}
          onGlobeClick={handleGlobeClick}
          // Point markers for historical events
          pointsData={markers}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          pointLabel={getPointLabel}
          onPointHover={setHoveredPoint}
          onPointClick={(point) => {
            const event = historicalEvents.find(e => e.name === point.name)
            if (event) {
              setSelectedLocation(event.location)
            }
          }}
          // Rings for selected location
          ringsData={selectedRing}
          ringColor={() => '#00fff7'}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          // Arcs (optional - could connect locations)
          arcsData={[]}
          // Performance
          animateIn={true}
          waitForGlobeReady={true}
        />
      )}

      {/* Crosshair overlay */}
      <div className="globe-crosshair">
        <div className="crosshair-h" />
        <div className="crosshair-v" />
        <div className="crosshair-center" />
      </div>

      {/* Coordinates display */}
      {selectedLocation && (
        <div className="coordinates-display">
          <div className="coord-label">TARGET LOCKED</div>
          <div className="coord-value">
            <span className="coord-lat">{selectedLocation.lat.toFixed(4)}°</span>
            <span className="coord-separator">/</span>
            <span className="coord-lng">{selectedLocation.lng.toFixed(4)}°</span>
          </div>
          {selectedLocation.name && (
            <div className="coord-name">{selectedLocation.name}</div>
          )}
        </div>
      )}

      {/* Instruction hint */}
      {!selectedLocation && (
        <div className="globe-hint">
          <span className="hint-icon">🌍</span>
          Click anywhere on the globe to select a destination
        </div>
      )}
    </div>
  )
}

export default Globe
