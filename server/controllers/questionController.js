import db from '../config/db.js';

const getQuestions = async (req, res) => {
  try {
    const questions = await db('questions').select('*');
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const askQuestion = async (req, res) => {
  const { title, body, tags } = req.body;
  try {
    const [question] = await db('questions')
      .insert({ title, body, tags })
      .returning('*');
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [question] = await db('questions')
      .where({ id })
      .del()
      .returning('*');
    if (question) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export {
    askQuestion,
    deleteQuestion,
    getQuestions
};