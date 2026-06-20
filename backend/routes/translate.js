import express from 'express';
import { handleTranslate } from '../controllers/translateController.js';

const router = express.Router();

// POST /api/translate
router.post('/', handleTranslate);

export default router;
