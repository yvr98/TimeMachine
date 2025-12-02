import { useApp } from '../../context/AppContext'
import './LaunchButton.css'

function LaunchButton({ onLaunch }) {
  const { selectedLocation, isGenerating } = useApp()

  // Only need a location selected - no API key required!
  const isDisabled = !selectedLocation || isGenerating

  return (
    <div className="launch-container">
      <button
        className={`launch-button ${isGenerating ? 'generating' : ''}`}
        onClick={onLaunch}
        disabled={isDisabled}
      >
        <div className="button-glow" />
        <div className="button-ring outer" />
        <div className="button-ring inner" />

        <div className="button-content">
          {isGenerating ? (
            <>
              <div className="generating-spinner" />
              <span className="button-text">TRAVELING</span>
            </>
          ) : (
            <>
              <span className="button-icon">⚡</span>
              <span className="button-text">INITIATE JUMP</span>
            </>
          )}
        </div>

        {/* Energy waves when active */}
        {isGenerating && (
          <div className="energy-waves">
            <div className="wave wave-1" />
            <div className="wave wave-2" />
            <div className="wave wave-3" />
          </div>
        )}
      </button>

      {/* Status indicators */}
      <div className="status-row">
        <div className="status-item ready">
          <span className="status-dot" />
          <span className="status-label">POWER</span>
        </div>
        <div className={`status-item ${selectedLocation ? 'ready' : 'not-ready'}`}>
          <span className="status-dot" />
          <span className="status-label">TARGET</span>
        </div>
        <div className="status-item ready">
          <span className="status-dot" />
          <span className="status-label">SYSTEMS</span>
        </div>
      </div>
    </div>
  )
}

export default LaunchButton
