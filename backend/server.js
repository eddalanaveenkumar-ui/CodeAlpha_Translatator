import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import translateRoutes from './routes/translate.js';

// Load env configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for development origins
app.use(cors({
  origin: '*', // Allow all origins for dev/testing, can restrict in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// API Routes
app.use('/api/translate', translateRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Translation backend service is running' });
});

// Default root response
app.get('/', (req, res) => {
  res.send('Welcome to the Premium Translation API Service');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Translation API Server running on port ${PORT}`);
  console.log(`🔧 Health check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});
