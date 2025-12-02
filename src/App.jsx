import { useApp } from './context/AppContext'
import Globe from './components/Globe/Globe'
import TimeMachine from './components/TimeMachine/TimeMachine'
import Experience from './components/Experience/Experience'
import ApiKeyInput from './components/ApiKeyInput/ApiKeyInput'
import './App.css'

function App() {
  const {
    isTraveling,
    generatedText,
    generatedImage,
    isGenerating,
    showApiKeyModal
  } = useApp()

  const showExperience = isTraveling || generatedText || generatedImage || isGenerating

  return (
    <div className="app">
      {/* Background Globe */}
      <div className="globe-container">
        <Globe />
      </div>

      {/* Main Control Panel */}
      <TimeMachine />

      {/* Experience Overlay */}
      {showExperience && (
        <div className="experience-overlay">
          <Experience />
        </div>
      )}

      {/* Decorative Elements */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />

      {/* API Key Modal */}
      {showApiKeyModal && <ApiKeyInput />}
    </div>
  )
}

export default App
