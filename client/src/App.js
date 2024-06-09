import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout'; 
import HomePage from './pages/Home/HomePage'; 
import Questions from './pages/Questions/Questions'; 
import Tags from './pages/Tags/Tags'; 
import ProfilePage from './pages/Profile/ProfilePage'; 
import RegisterPage from './pages/Auth/Register'; 
import LoginPage from './pages/Auth/Login'; 
import './App.js';


const App = () => {
  // State hooks for managing questions, registration status, and login status
  const [questions, setQuestions] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   // Function to add a new question
   const addQuestion = (question) => {
    setQuestions([...questions, question]); // Add the new question to the questions array
  };

  // Function to add an answer to a question
  const addAnswer = (questionIndex, answer) => {
    const newQuestions = [...questions]; // Create a copy of the questions array
    newQuestions[questionIndex].answers.push(answer); // Add the answer to the specified question
    setQuestions(newQuestions); // Update the questions array
  };
  
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={isRegistered ? <Navigate to="/login" /> : <RegisterPage setIsRegistered={setIsRegistered} />} />
          <Route path="/home" element={<HomePage addQuestion={addQuestion} />} />
          <Route path="/questions" element={<Questions questions={questions} addAnswer={addAnswer} />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/userProfile" element={<ProfilePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;