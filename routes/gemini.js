import express from 'express';
import { getDiagnosis, summarize } from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/getDiagonosis', getDiagnosis);
router.post('/summarize', summarize);

export default router;