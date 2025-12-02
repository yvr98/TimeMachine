import { useApp } from '../../context/AppContext'
import './LocationDisplay.css'

function LocationDisplay() {
  const { selectedLocation } = useApp()

  return (
    <div className="location-display">
      <div className="location-label">
        <span className="label-icon">📍</span>
        <span className="label-text">SPATIAL COORDINATES</span>
      </div>

      <div className="location-content">
        {selectedLocation ? (
          <>
            <div className="coordinates">
              <div className="coord-row">
                <span className="coord-label">LAT</span>
                <span className="coord-value">{selectedLocation.lat.toFixed(4)}°</span>
              </div>
              <div className="coord-divider" />
              <div className="coord-row">
                <span className="coord-label">LNG</span>
                <span className="coord-value">{selectedLocation.lng.toFixed(4)}°</span>
              </div>
            </div>
            {selectedLocation.name && (
              <div className="location-name">
                <span className="name-label">DESTINATION</span>
                <span className="name-value">{selectedLocation.name}</span>
              </div>
            )}
          </>
        ) : (
          <div className="no-location">
            <div className="pulse-ring" />
            <span className="no-location-text">AWAITING TARGET SELECTION</span>
            <span className="no-location-hint">Click on the globe to select a destination</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationDisplay
