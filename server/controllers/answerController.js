import db from '../config/db.js';

// Controller function to add a new answer to a question
export const addAnswer = async (req, res) => {
  try {
    // Destructure id from request parameters and body from request body
    const { id } = req.params;
    const { body } = req.body;

    // Convert id to integer
    const question_id = parseInt(id, 10);

    // Validate question_id
    if (isNaN(question_id)) {
      return res.status(400).json({ error: 'Invalid question ID' });
    }

    // Ensure body is not empty
    if (!body) {
      return res.status(400).json({ error: 'Answer body cannot be empty' });
    }

    // Insert the answer into the database and return the id of the new answer
    const [newAnswerId] = await db('answers')
      .insert({ body, question_id })
      .returning('id')
      .then((rows) => rows.map((row) => row.id)); // Map to get the id directly

    // Fetch the newly created answer to return in the response
    const newAnswer = await db('answers')
      .where({ id: newAnswerId })
      .first();

    // Send a 201 Created response with the new answer
    res.status(201).json({ answer: newAnswer });
  } catch (error) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete an answer by ID
export const deleteAnswer = async (req, res) => {
  try {
    // Destructure id from request parameters
    const { id } = req.params;

    // Delete the answer with the specified ID
    await db('answers').where({ id }).del();

    // Send a 200 OK response indicating the answer was deleted successfully
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all answers
export const getAnswers = async (req, res) => {
  try {
    // Fetch all answers from the 'answers' table
    const answers = await db('answers').select('*');
    // Send a 200 OK response with the retrieved answers
    res.status(200).json(answers);
  } catch (err) {
    // Send a 500 Internal Server Error response if there's an error
    res.status(500).json({ error: err.message });
  }
};