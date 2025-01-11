import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon


function TakeQuiz() {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const { quizId } = useParams();
    const navigate = useNavigate();

    // Fetch the quiz details when the component mounts
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const response = await axios.get(`https://backend-express-inky.vercel.app/api/quizzes/${quizId}`);
                console.log(response);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuizDetails();
    }, [quizId]);

    // Handle answer selection
    const handleAnswerChange = (questionIndex, optionIndex) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = optionIndex;  // Store selected answer index for each question
            return updatedAnswers;
        });
    };

    // Handle quiz submission
    const handleSubmit = async () => {
        let score = 0;
        quiz.questions.forEach((question, index) => {
            const selectedOptionIndex = answers[index];
            if (selectedOptionIndex !== undefined) {
                const correctOption = question.options.find(option => option.isCorrect);
                if (question.options[selectedOptionIndex].isCorrect === correctOption.isCorrect) {
                    score += 1;
                }
            }
        });
    
        // Get userId from localStorage
        const userId = localStorage.getItem('userId');
    
        // Prepare data to send to the backend
        const quizData = {
            userId: userId,  // Add userId here
            quizId: quiz._id,
            subjectId: quiz.subject._id,  // Only pass the subjectId (not the entire object)
            score: score,
            totalQuestions: quiz.questions.length
        };
        
    
        // Make API call to save the quiz score for the user using axios
        try {
            const response = await axios.post('https://backend-express-inky.vercel.app/api/quizzes/save-quiz-score', quizData);
            alert(`Your score is: ${score} / ${quiz.questions.length}`);
        } catch (error) {
            console.error('Error saving quiz score:', error);
        }
    };
    

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            {quiz ? (
                <div className="card p-4 w-75">
                    <h2 className="text-center mb-4">{quiz.title}</h2>
                    <h4 className="text-center mb-4">Subject: {quiz.subject.name}</h4>
                    <form>
                        {quiz.questions.map((question, index) => (
                            <div key={index} className="question mb-4">
                                <p><strong>{index + 1}. {question.question}</strong></p>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={`question-${index}`}
                                            value={optionIndex}
                                            onChange={() => handleAnswerChange(index, optionIndex)}
                                        />
                                        <label className="form-check-label">{option.text}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </form>
                    <div className="text-center">
                        <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Quiz</button>
                    </div>
                    {/* Home Icon */}
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            className="home-button"
                            onClick={() => navigate('/dashboard')} // Navigate to the user dashboard
                            title="Go to Dashboard"
                        >
                            <FaHome size={24} />
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading quiz...</p>
            )}
        </div>
    );

}

export default TakeQuiz;
