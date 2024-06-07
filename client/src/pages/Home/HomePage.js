import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ addQuestion }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = { title, body, tags: tags.split(' '), answers: [] };
    addQuestion(newQuestion);
    setTitle('');
    setBody('');
    setTags('');
    saveQuestionToStorage(newQuestion); // Save the question to localStorage
    navigate('/questions');
  };

  const saveQuestionToStorage = (question) => {
    // Retrieve existing questions from localStorage
    const existingQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    // Add the new question to the existing questions array
    const updatedQuestions = [...existingQuestions, question];
    // Save the updated questions array back to localStorage
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <div className="container">
      <h2 className="form-title">Ask Question</h2>
      <div className="home-page-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Be specific and imagine you're asking question to another person"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              placeholder="Include all the information someone would need to answer your question"
              id="body"
              value={body}
              onChange={handleBodyChange}
              required
              className="big-textarea"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              placeholder="Add up to 5 tags to describe what your question is about, e.g. #rent"
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              required
            />
          </div>
          <button type="submit">Ask question</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;