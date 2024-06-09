import React, { useState, useEffect } from 'react';
import Answer from './Answers';
import './style.css';

const QuestionPage = () => {
  // State variables
  const [questions, setQuestions] = useState([]); // State for storing all questions
  const [searchQuery, setSearchQuery] = useState(''); // State for storing search query
  const [filteredQuestions, setFilteredQuestions] = useState([]); // State for storing filtered questions

  // Fetch questions from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/questions/get');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Map questions to include answers property, set both questions and filteredQuestions state
        const questionsWithAnswers = data.map(question => ({
          ...question,
          answers: question.answers || []
        }));
        setQuestions(questionsWithAnswers);
        setFilteredQuestions(questionsWithAnswers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter questions based on search query
  useEffect(() => {
    const filtered = questions.filter(question =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchQuery, questions]);

  // JSX rendering
  return (
    <div className="container">
      <h2>Questions</h2>
      {/* Search input */}
      <input
        type="search"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* List of questions */}
      <div className="questions-list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question-container">
            <div className="question-details">
              {/* Question details */}
              <h3>{question.title}</h3>
              <p><strong>Body: </strong>{question.body}</p>
              <p><strong>Tags: </strong>{question.tags}</p>
            </div>
            {/* Component to add answers */}
            <div className="add-answer-container">
              <Answer questionId={question.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;