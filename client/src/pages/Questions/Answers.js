import React, { useState } from 'react';
import './style.css'

const Answers = ({ questionIndex, addAnswer, answers }) => {
  const [answerContent, setAnswerContent] = useState('');
  const [username, setUsername] = useState(''); // Assuming you have a way to get the username

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (answerContent) {
      addAnswer(questionIndex, { content: answerContent, user: username }); // Include user info with answer
      setAnswerContent('');
    }
  };

  return (
    <div>
      <form onSubmit={handleAnswerSubmit}>
        <input
          type="text"
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          placeholder="Write an answer..."
        />
        <button type="submit">Answer</button>
      </form>
      <div>
        {answers.map((answer, index) => (
          <div key={index} className="answer">
            <p>User: {answer.user}</p>
            <p>{answer.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;