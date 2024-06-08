import express from 'express';
import { askQuestion, deleteQuestion, getQuestions } from '../controllers/questionController.js'


const router = express.Router();

router.post('/ask', askQuestion);
router.get('/get', getQuestions);
router.delete('/delete/:id', deleteQuestion);


export default router;
