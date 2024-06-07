import React from 'react';
import Answer from './Answers';
import './style.css'

const QuestionPage = ({ questions, addAnswer }) => {
  return (
    <div className="container">
      <h2>Questions</h2>
      <div>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <h3>Title: {question.title}</h3>
            <p><strong>Body: </strong>{question.body}</p>
            <p><strong>Tags: </strong> {question.tags.join(', ')}</p>
            <Answer questionIndex={index} addAnswer={addAnswer} answers={question.answers} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;