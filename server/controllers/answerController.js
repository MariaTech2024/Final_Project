import db from '../config/db.js';

export const addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Your logic to add an answer
    const answer = await db('answers').insert({ content, question_id: id });

    res.status(201).json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    // Your logic to delete an answer
    await db('answers').where({ id }).del();

    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAnswers = async (req, res) => {
  try {
    const answers = await db('answers').select('*');
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};