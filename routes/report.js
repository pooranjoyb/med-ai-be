import express from 'express';
import generateDoc from '../controllers/report.controller.js';

const router = express.Router();

router.post('/generateDoc', generateDoc);

export default router;