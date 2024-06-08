import React, { useState, useEffect } from 'react';
import Answer from './Answers';
import './style.css';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/questions/get');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
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

  useEffect(() => {
    const filtered = questions.filter(question =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchQuery, questions]);

  const addAnswer = (questionIndex, newAnswer) => {
    setQuestions(prevQuestions => {
      const newQuestions = [...prevQuestions];
      if (questionIndex >= 0 && questionIndex < newQuestions.length) {
        newQuestions[questionIndex].answers.push(newAnswer);
      }
      return newQuestions;
    });
  };

  return (
    <div className="container">
      <h2>Questions</h2>
      <input
        type="search"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question">
            <h3>Title: {question.title}</h3>
            <p><strong>Body: </strong>{question.body}</p>
            <p><strong>Tags: </strong>{question.tags}</p>
            <Answer
              questionIndex={index}
              answers={question.answers}
              addAnswer={addAnswer}
              key={`answer-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;