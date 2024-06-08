import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// Function to register a new user
const registerUser = async (req, res) => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body;
  try {
    // Hash the provided password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert the user data into the database, including the hashed password
    const result = await db('users').insert({ username, email, password: hashedPassword }).returning('*');
    
    // Send a success response with the newly registered user's data
    res.status(201).json({ message: 'User registered successfully', user: result[0] });
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate and log in a user
const loginUser = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;
  try {
    // Retrieve the user from the database based on the provided email
    const user = await db('users').where('email', email).first();
    
    // If no user is found with the provided email, send a 400 Bad Request response
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If the passwords don't match, send a 400 Bad Request response
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate a JWT token with the user's ID and username, and sign it with the JWT secret
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send a success response with the generated token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error('Error logging in user:', error);
    res.status(500).json({ error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    // Extract search query parameter from the request
    const { search } = req.query;

    // Initialize the database query
    let query = db('users');

    // Modify the query based on the search parameter
    if (search === "all") {
      query = query.select('*'); // Select all columns
    } else if (search) {
      query = query.whereRaw(`username ILIKE '%${search}%' OR email ILIKE '%${search}%'`); // Filter by search keyword
    }

    // Execute the query and send the results as response
    const userList = await query;
    res.status(200).json(userList);
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from the request parameters
    const updateData = req.body; // Extract update data from the request body

    // Check if the updateData is empty
    if (!updateData) {
      return res.status(400).json({ error: 'Update data is required' });
    }

    // Update the user profile in the database
    await db('users')
      .where({ id }) // Filter by user ID
      .update(updateData); // Update the user profile with the provided data

    // Fetch and return the updated user profile
    const updatedProfile = await db('users').where({ id }).first();
    res.status(200).json(updatedProfile);
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export { registerUser, loginUser, getAllUsers, updateProfile };