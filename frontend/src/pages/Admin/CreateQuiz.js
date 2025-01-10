// pages/Admin/CreateQuiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon

function CreateQuiz() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([{
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    correct: 0
  }]);

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

  const handleQuestionChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const values = [...questions];
    values[qIndex].options[oIndex].text = event.target.value; // Set the text value for the option
    setQuestions(values);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const values = [...questions];

    // Set all options to incorrect
    values[qIndex].options.forEach((option, index) => {
      option.isCorrect = false;
    });

    // Set the selected option as correct
    values[qIndex].options[oIndex].isCorrect = true;

    // Optionally, update the correct index
    values[qIndex].correct = oIndex; // You can keep track of which option is correct

    setQuestions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/quizzes/create', { subjectId, title, questions });
      alert('Quiz created successfully');
    } catch (error) {
      alert('Error creating quiz');
      console.error(error);
    }
  };

  return (
    <div className="create-quiz-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="create-quiz-container p-5 rounded shadow-lg">
        <h2 className="text-center mb-4">Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          {/* Subject & Title in One Row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Select Subject</label>
              <select
                className="form-select"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
              >
                <option value="">Select a Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Quiz Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
          </div>
  
          {/* Questions */}
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-3 question-box rounded">
              <label className="form-label fw-bold">Question {index + 1}</label>
              <input
                type="text"
                className="form-control mb-2"
                name="question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Enter question"
              />
  
              {/* Options in Two Rows */}
              <div className="row">
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="col-md-6 mb-2">
                    <div className="input-group align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <div className="input-group-text">
                        <input
                          type="radio"
                          name={`correct-${index}`}
                          checked={q.correct === optionIndex}
                          onChange={() => handleCorrectOptionChange(index, optionIndex)}
                        />
                        <span className="ms-2">Correct</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
  
          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary px-4">Create Quiz</button>
          </div>
        </form>
  
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

export default CreateQuiz;
