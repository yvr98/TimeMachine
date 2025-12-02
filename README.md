# CHRONOS - Time Machine

An interactive time-travel experience powered by AI. Select any place and time period on a 3D globe, and CHRONOS will transport you there with vivid AI-generated descriptions and images.

## Features

- **Interactive 3D Globe** - Click anywhere on Earth to select your destination
- **Time Selection** - Choose from prehistoric times to the present day using an intuitive dial control
- **Historical Events** - Browse or randomly select from 50+ curated historical moments
- **AI-Powered Experience** - Get immersive, historically-accurate descriptions of your destination
- **Image Generation** - See AI-generated images of historical scenes
- **Model Selection** - Choose from multiple AI models for text and image generation

## Tech Stack

- **React 18** + **Vite** - Fast, modern frontend tooling
- **react-globe.gl** - Interactive 3D WebGL globe
- **Three.js** - 3D graphics engine
- **Pollinations.AI** - AI text and image generation API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd chronos-time-machine

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Free vs Premium Mode

**Free Mode (Default)** - Works immediately without any setup! Uses Pollinations.ai free endpoints with rate limiting.

**Premium Mode (Optional)** - For unlimited access and additional models:
1. Get an API key from [enter.pollinations.ai](https://enter.pollinations.ai)
2. Click "AI Models" in the control panel
3. Select "Premium" and enter your API key

## Usage

1. **Select a Location** - Click on the 3D globe to choose where you want to travel
2. **Set the Time** - Use the dial to select your target year, or pick an era
3. **Choose AI Models** - Optionally expand the model selector to pick different AI models
4. **Random Destination** - Click "Random Destination" to be surprised with a historical event
5. **Initiate Jump** - Press the launch button to travel through time!

## API Key Security

Your API key is stored **locally in your browser's localStorage** and is never sent to any server except Pollinations.ai for API calls. The key is not included in the codebase.

**Important:**
- Never commit your `.env` file or API key to version control
- The `.env.example` file shows the format but contains no real keys
- Use publishable keys (`pk_*`) for client-side applications

## Project Structure

```
src/
├── components/
│   ├── Globe/          # 3D interactive globe
│   ├── TimeMachine/    # Main control panel
│   ├── ModelSelector/  # AI model selection
│   ├── Randomizer/     # Historical event randomizer
│   ├── Experience/     # AI-generated content display
│   └── ApiKeyInput/    # API key configuration
├── context/
│   └── AppContext.jsx  # Global state management
├── data/
│   └── historicalEvents.js  # Curated historical events
├── utils/
│   ├── api.js          # Pollinations API integration
│   └── prompts.js      # AI prompt templates
└── styles/
    └── variables.css   # Design system tokens
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Credits

- Globe visualization powered by [react-globe.gl](https://github.com/vasturiano/react-globe.gl)
- AI generation powered by [Pollinations.AI](https://pollinations.ai)
- Earth textures from [Three.js examples](https://threejs.org)

---

Built with curiosity about the past and powered by AI. Enjoy your travels through time!
