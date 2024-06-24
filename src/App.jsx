import React, { useState } from 'react';
import './App.css';
import questions from './assets/components/quizQuestion';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousButtonClick = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const handleNextButtonClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleQuitButtonClick = () => {
    const quitConfirmed = window.confirm("Are you sure you want to quit?");
    if (quitConfirmed) {
      setShowScore(true);
    }
  };

  const handleResetButtonClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} out of {questions.length}</h2>
          <button onClick={handleResetButtonClick}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}:</h2>
          <p>{questions[currentQuestion].text}</p>
          <div className="options">
            {questions[currentQuestion].options.map(option => (
              <button key={option.id} onClick={() => handleAnswerButtonClick(option.isCorrect)}>
                {option.text}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && <button className="previous" onClick={handlePreviousButtonClick}>Previous</button>}
            {currentQuestion < questions.length - 1 && <button className="next" onClick={handleNextButtonClick}>Next</button>}
            <button className="quit" onClick={handleQuitButtonClick}>Quit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
