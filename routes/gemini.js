import express from 'express';
import getMedicalDiagonosis from '../controllers/gemini.controller.js';

const router = express.Router();

router.post('/getDiagonosis', getMedicalDiagonosis);

export default router;