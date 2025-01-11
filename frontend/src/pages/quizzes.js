import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon

function UserQuizList() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  // Fetch subjects when the component loads
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('https://backend-express-inky.vercel.app/api/subjects');
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
          const response = await axios.get(`https://backend-express-inky.vercel.app/api/quizzes/getBySubject/${selectedSubject}`);
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
                    <button
                      onClick={() => navigate(`/dashboard/quizzes/takequiz/${quiz._id}`)} // Navigate to the quiz page for taking the quiz
                      className="btn btn-success btn-sm w-100"
                    >
                      Take Quiz
                    </button>
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
