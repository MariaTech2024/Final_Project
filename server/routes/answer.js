import express from 'express';
import { addAnswer, deleteAnswer, getAnswers } from '../controllers/answerController.js';


const router = express.Router();

router.post('/add/:id', addAnswer)
router.get('/get', getAnswers);
router.delete('/delete/:id', deleteAnswer)

export default router;