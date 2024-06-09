import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // State hooks for managing form inputs
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate(); 

  // Handlers for input changes to update state
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const newQuestion = { title, body, tags }; // Create an object with the question details

    try {
      // Make a POST request to the ask question endpoint
      const response = await fetch('http://localhost:5000/questions/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      // Check if the response is not okay (i.e., failed to add question)
      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      const responseData = await response.json(); // Parse the response data
      console.log('Question added:', responseData); // Log the response data
      navigate('/questions'); // Navigate to the questions page
    } catch (error) {
      // Handle any errors during the question submission
      console.error('Error adding question:', error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="form-title">Ask Question</h2>
      <div className="home-page-content">
        <form onSubmit={handleSubmit}>
          {/* Form group for title input */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Be specific and imagine you're asking question to another person"
              id="title"
              value={title}
              onChange={handleTitleChange} // Update title state on change
              required // Make this field required
            />
          </div>

          {/* Form group for body input */}
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              placeholder="Include all the information someone would need to answer your question"
              id="body"
              value={body}
              onChange={handleBodyChange} // Update body state on change
              required // Make this field required
              className="big-textarea"
            />
          </div>

          {/* Form group for tags input */}
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              placeholder="Add up to 5 tags to describe what your question is about, e.g. #rent"
              id="tags"
              value={tags}
              onChange={handleTagsChange} // Update tags state on change
              required // Make this field required
            />
          </div>

          {/* Submit button */}
          <button type="submit">Ask question</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;