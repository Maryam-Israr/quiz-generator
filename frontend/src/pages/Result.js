import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon

function UserQuizList() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [userScores, setUserScores] = useState([]); // Store user scores for each quiz
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Get userId from local storage

    // Fetch subjects when the component loads
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, []);

    // Fetch quizzes based on the selected subject
    useEffect(() => {
        if (selectedSubject) {
            const fetchQuizzes = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/quizzes/getBySubject/${selectedSubject}`);
                    setQuizzes(response.data);
                } catch (error) {
                    console.error('Error fetching quizzes:', error);
                }
            };
            fetchQuizzes();

            // Fetch user quiz scores based on the selected subject
            const fetchUserScores = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                    console.log(response);
                    const scores = response.data.quizScores.filter(score => score.subject.toString() === selectedSubject);
                    setUserScores(scores);
                } catch (error) {
                    console.error('Error fetching user scores:', error);
                }
            };

            fetchUserScores();
        } else {
            setQuizzes([]); // If no subject is selected, clear quizzes
            setUserScores([]); // Clear user scores
        }
    }, [selectedSubject, userId]);

    // Retake Quiz function
    const handleRetakeQuiz = (quizId) => {
        // Navigate to the quiz page for retaking the quiz
        navigate(`/dashboard/quizzes/takequiz/${quizId}`);
    };

    return (
        <div className="quiz-list-wrapper d-flex justify-content-center align-items-start mt-5">
            <div className="quiz-list-container p-4 rounded shadow-lg">
                <h2 className="text-center mb-4">Available Quizzes</h2>

                {/* Subject Dropdown */}
                <div className="mb-4">
                    <label className="form-label" htmlFor="subjectSelect">Select Subject</label>
                    <select
                        id="subjectSelect"
                        className="form-select form-control-lg"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="">Select a Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display Quizzes and Scores */}
                {selectedSubject && quizzes.length === 0 && (
                    <p className="text-muted text-center">No quizzes found for this subject.</p>
                )}

                <div className="row">
                    {quizzes.map((quiz) => {
                        const userScore = userScores.find((score) => score.quiz.toString() === quiz._id);
                        const score = userScore ? userScore.score : 0;
                        const totalQuestions = quiz.questions ? quiz.questions.length : 0; // Correctly access the questions

                        return (
                            <div key={quiz._id} className="col-md-4 mb-4">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{quiz.title}</h5>
                                        <p className="card-text mb-3">
                                            <strong>Subject:</strong> {quiz.subject.name}
                                        </p>
                                        <p className="card-text mb-3">
                                            <strong>Score:</strong> {score} / {totalQuestions}
                                        </p>
                                        <div className="mt-auto">
                                            <button
                                                onClick={() => handleRetakeQuiz(quiz._id)} // Retake Quiz
                                                className="btn btn-success btn-sm w-100"
                                            >
                                                Retake Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

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
        </div>
    );
}

export default UserQuizList;
