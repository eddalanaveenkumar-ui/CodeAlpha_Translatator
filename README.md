# Lumina Translate — Premium Language Translation SaaS

Lumina Translate is a complete, production-ready, and highly polished Language Translation Web Application featuring an Apple-level premium UI/UX. It supports both **Light Mode** and **Dark Mode** (toggled seamlessly with OS media query backups), provides text-to-speech feedback, exports translation text files, maintains user history (up to last 10 queries), supports keyboard hotkeys, and runs out-of-the-box with immediate fallbacks.

---

## Key Features

- 🌐 **100+ Languages**: Full support for over 100 languages with display names and flag representations.
- 🔍 **Auto Language Detect**: Automatically discovers source speech text languages.
- ⚡ **Ctrl + Enter Hotkey**: Quick keyboard shortcut for instant translations.
- ☀/🌙 **Theme Toggle**: Light/Dark layouts synchronized across browser updates via `localStorage` and system media defaults.
- 🗣 **Text to Speech**: Synthesizes and reads original or translated text dynamically using local vocal engines matching target locales.
- 💾 **Download Translation**: Archive translations locally into `.txt` logs.
- 📋 **Copy to Clipboard**: Quick copying utilities for both input and translations.
- ⏳ **Responsive & Smooth UI**: Mobile/Tablet/Desktop responsive layout built using glassmorphism styling, subtle shadows, and premium page transitions via Framer Motion.
- 🛠 **Graceful Fallbacks**: Works immediately without configurations using the free public MyMemory API, with support for Google Cloud Translate and Microsoft Cognitive APIs.

---

## Project Structure

```
Transulation/
├── backend/
│   ├── controllers/
│   │   └── translateController.js   # Handles validation and endpoints
│   ├── routes/
│   │   └── translate.js             # Route mapping (/api/translate)
│   ├── services/
│   │   └── translator.js            # Translation gateway (Google/Microsoft/MyMemory)
│   ├── .env                         # Server environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Express app initialization
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx           # App nav and branding
│   │   │   ├── ThemeToggle.jsx      # Light/Dark animated toggle
│   │   │   ├── TranslatorCard.jsx   # Layout coordinating cards
│   │   │   ├── LanguageSelector.jsx # Searchable dropdown component
│   │   │   ├── TextInput.jsx        # Input card
│   │   │   ├── OutputCard.jsx       # Output card with overlays
│   │   │   ├── History.jsx          # Recent queries dashboard
│   │   │   ├── Footer.jsx           # Developer credits
│   │   │   ├── Loader.jsx           # Premium glass spinner
│   │   │   └── Buttons.jsx          # Reusable Framer Motion buttons
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Dark mode settings context
│   │   ├── hooks/
│   │   │   └── useTheme.js          # Consumes ThemeContext
│   │   ├── pages/
│   │   │   └── Home.jsx             # Top-level state orchestrator
│   │   ├── utils/
│   │   │   ├── api.js               # Axios instance setup
│   │   │   ├── copy.js              # Clipboard utility
│   │   │   ├── download.js          # File exporter
│   │   │   ├── speech.js            # TTS Web Speech wrapper
│   │   │   └── languages.js         # ISO languages dictionary
│   │   ├── App.jsx                  # App container & toast config
│   │   ├── index.css                # Tailwind directives and glass styles
│   │   └── main.jsx                 # Vite entrypoint
│   ├── index.html                   # HTML metadata & Fonts
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind setup & classes
│   └── vite.config.js               # Vite packaging configurations
└── README.md                        # Documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or newer (Verify via `node -v`)
- **npm**: v9.x or newer

---

### Installation

Clone or extract the repository, then install dependencies for both the frontend and backend.

#### 1. Setup Backend
```bash
cd backend
npm install
```

#### 2. Setup Frontend
```bash
cd ../frontend
npm install
```

---

### Environment Setup

Create a `.env` file in the `backend/` directory based on the `.env.example`:

```env
# Server Port
PORT=5000

# Google Cloud Translation API Key (Optional)
GOOGLE_API_KEY=your_google_api_key_here

# Microsoft Cognitive Translator (Optional)
MICROSOFT_API_KEY=your_microsoft_key_here
MICROSOFT_LOCATION=global
```

*Note: If no API keys are provided, the backend will automatically translate text using the free MyMemory translation API. There is no configuration required to test out the application immediately.*

---

### Running the Project Locally

#### Start the Backend API Server
Navigate to the `backend/` folder and run:
```bash
cd backend
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000). You can check its status by visiting [http://localhost:5000/health](http://localhost:5000/health) in your browser.

#### Start the Frontend App
Navigate to the `frontend/` folder and run:
```bash
cd frontend
npm run dev
```
This launches the development server on [http://localhost:3000](http://localhost:3000) and opens it automatically in your default browser.

---

## Production Deployment

### Frontend (Vercel / Netlify)
1. Set the build command to `npm run build`
2. Set the output directory to `dist`
3. Add the environment variable `VITE_API_URL` pointing to your deployed backend API URL (e.g., `https://my-translator-api.onrender.com/api`).

### Backend (Render / Heroku)
1. Deploy as a Node.js web service.
2. Set the start command to `npm start`
3. Add environment variables: `PORT=10000`, `GOOGLE_API_KEY`, or `MICROSOFT_API_KEY` in the service dashboard settings.

---

## Troubleshooting & FAQ

- **"Access Denied" or "Rate Limit Exceeded"**:
  When using the free MyMemory API fallback, the public server may rate limit excessive requests. Add a valid `GOOGLE_API_KEY` or `MICROSOFT_API_KEY` to the `.env` to prevent limitations.
- **PowerShell blocks script running (`UnauthorizedAccess` / `ExecutionPolicy`)**:
  On Windows systems, invoke commands using `npm.cmd` instead of `npm`, or run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in your developer console.
- **Vocal/Speech playback is silent**:
  Ensure your operating system and web browser have text-to-speech voices installed for the chosen languages. High-quality voices are built-in automatically in modern Chrome, Edge, and Safari environments.
