import db from '../config/db.js';

// Controller function to get all questions
const getQuestions = async (req, res) => {
  try {
    // Fetch all questions from the 'questions' table
    const questions = await db('questions').select('*');
    // Send a 200 OK response with the retrieved questions
    res.status(200).json(questions);
  } catch (err) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: err.message });
  }
};

// Controller function to post a new question
const askQuestion = async (req, res) => {
  // Destructure title, body, and tags from the request body
  const { title, body, tags } = req.body;
  try {
    // Insert a new question into the 'questions' table and return the inserted row
    const [question] = await db('questions')
      .insert({ title, body, tags })
      .returning('*');
    // Send a 201 Created response with the new question
    res.status(201).json(question);
  } catch (err) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: err.message });
  }
};

// Controller function to delete a question by ID
const deleteQuestion = async (req, res) => {
  // Parse the ID from the request parameters
  const id = parseInt(req.params.id);
  try {
    // Delete the question with the specified ID and return the deleted row
    const [question] = await db('questions')
      .where({ id })
      .del()
      .returning('*');
    // If a question was deleted, send a 200 OK response
    if (question) {
      res.status(200).json({ message: 'Question deleted' });
    } else {
      // If no question was found with the specified ID, send a 404 Not Found response
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (err) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: err.message });
  }
};

export {
  askQuestion,
  deleteQuestion,
  getQuestions
};