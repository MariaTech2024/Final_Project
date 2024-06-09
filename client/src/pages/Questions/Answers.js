import React, { useState } from 'react';
import './style.css'


// Answer component for submitting answers to a question
const Answer = ({ questionId }) => {
  // State variables
  const [answerBody, setAnswerBody] = useState(''); // State for storing the answer body
  const [error, setError] = useState(null); // State for storing error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for storing success messages

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to add answer to the question
      const response = await fetch(`http://localhost:5000/answers/add/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: answerBody }) // Include answer body in the request body
      });
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.error); // Throw error message received from server
      }
      setSuccessMessage('Answer submitted successfully!'); // Set success message
      // Clear the answer input after successful submission
      setAnswerBody('');
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // JSX rendering
  return (
    <div>
      {/* Display error message if present */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* Display success message if present */}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {/* Answer submission form */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Answer input field */}
          <label htmlFor="answerBody" style={{fontSize: '25px'}}>Answer:</label>
          <textarea
            id="answerBody"
            value={answerBody}
            onChange={(e) => setAnswerBody(e.target.value)} // Update answer body state on change
            required // Make the field required
          />
        </div>
        {/* Submit button */}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default Answer;