import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon
function QuizList() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

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
    } else {
      setQuizzes([]); // If no subject is selected, clear quizzes
    }
  }, [selectedSubject]);
  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId) => {
    try {
      // Send delete request to the server
      await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`).then(()=>{
        alert('Quiz deleted successfully');
      });
      
      // After deletion, update the quizzes state by removing the deleted quiz
      setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      alert('Error deleting quiz');
      console.error('Error deleting quiz:', error);
    }
  };
  return (
    <div className="quiz-list-wrapper d-flex justify-content-center align-items-start mt-5">
      <div className="quiz-list-container p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Quiz List</h2>

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

        {/* Display Quizzes */}
        {selectedSubject && quizzes.length === 0 && (
          <p className="text-muted text-center">No quizzes found for this subject.</p>
        )}

        <div className="row">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{quiz.title}</h5>
                  <p className="card-text mb-3">
                    <strong>Subject:</strong> {quiz.subject.name}
                  </p>
                  <div className="mt-auto">
                    <a onClick={() => navigate(`/admin/quiz/edit/${quiz._id}`)} className="btn btn-primary btn-sm w-100">Edit Quiz</a>
                  </div>
                  <div className="mt-2">
                    <a onClick={() => handleDeleteQuiz(quiz._id)} className="btn btn-danger btn-sm w-100">Delete Quiz</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Icon */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="home-button"
            onClick={() => navigate('/admin')}
            title="Go to Dashboard"
          >
            <FaHome size={24} />
          </button>
        </div>
      </div>
    </div>
  );

}

export default QuizList;
