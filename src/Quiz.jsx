import React, { useState, useEffect } from 'react';
import './Quiz.css';
import questions from './questions.json';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(15);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        if (timer === 0) {
            handleNextQuestion();
        }

        return () => clearInterval(countdown);
    }, [timer]);

    const handleAnswerOptionClick = (key) => {
        setSelectedAnswer(key);

        if (key === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
            setTimer(15);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="quiz">
            {showScore ? (
                <div className="score-section">
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <div>
                    <div className="timer">Time left: {timer}s</div>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">
                            {questions[currentQuestion].question}
                        </div>
                    </div>
                    <div className="answer-section">
                        {Object.entries(questions[currentQuestion].options).map(([key, text]) => (
                            <button
                                key={key}
                                onClick={() => handleAnswerOptionClick(key)}
                                className={
                                    selectedAnswer
                                        ? key === questions[currentQuestion].answer
                                            ? 'correct'
                                            : selectedAnswer === key
                                            ? 'wrong'
                                            : ''
                                        : ''
                                }
                                disabled={!!selectedAnswer}
                            >
                                {key}: {text}
                            </button>
                        ))}
                    </div>
                    {selectedAnswer && (
                        <button className="next-button" onClick={handleNextQuestion}>
                            Next Question
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
