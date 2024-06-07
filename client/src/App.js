import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout'; 
import HomePage from './pages/Home/HomePage'; 
import Questions from './pages/Questions/Questions'; 
import Tags from './pages/Tags/Tags'; 
import ProfilePage from './pages/Profile/ProfilePage'; 
import RegisterPage from './pages/Auth/Register'; 
import LoginPage from './pages/Auth/Login'; 


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const addAnswer = (questionIndex, answer) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push(answer);
    setQuestions(newQuestions);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage addQuestion={addQuestion} />} />
          <Route path="/questions" element={<Questions questions={questions} addAnswer={addAnswer} />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/userProfile" element={<ProfilePage />} />
          {/* Route for Registration */}
          <Route path="/register" element={isRegistered ? <Navigate to="/login" /> : <RegisterPage setIsRegistered={setIsRegistered} />} />
          {/* Route for Login */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;