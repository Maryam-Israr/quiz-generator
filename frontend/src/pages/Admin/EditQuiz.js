import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon

function EditQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`https://backend-express-inky.vercel.app/api/quizzes/${quizId}`);
        console.log(response);
        setQuiz(response.data);
        setTitle(response.data.title);

        // Update options to use the 'isCorrect' flag
        const updatedQuestions = response.data.questions.map((q) => ({
          ...q,
          options: q.options.map((opt) => ({
            ...opt,
            isCorrect: opt.isCorrect === true, // Ensure 'isCorrect' is boolean
          })),
        }));
        setQuestions(updatedQuestions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleQuestionChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const values = [...questions];
    values[qIndex].options[oIndex].text = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    if (questions.length < 8) {
      const newQuestion = {
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        correct: 0
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  const handleRemoveQuestion = (index) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://backend-express-inky.vercel.app/api/quizzes/${quizId}`, { title, questions });
      alert('Quiz updated successfully');
      navigate('/admin/quizzes');
    } catch (error) {
      alert('Error updating quiz');
      console.error(error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 rounded-3 form-card">
        <h2 className="text-center mb-4">Edit Quiz</h2>
        <form onSubmit={handleSubmit}>
          {/* Quiz Title */}
          <div className="mb-3">
            <label className="form-label">Quiz Title</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Quiz Title"
            />
          </div>

          {/* Questions */}
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between mb-3">
                <div className="flex-grow-1 me-2">
                  <label className="form-label">Question {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, e)}
                    placeholder="Enter Question"
                  />
                </div>
              </div>

              {/* Options: 2 on each line */}
              <div className="row">
                {q.options.map((option, optionIndex) => (
                  <div className="col-md-6 mb-2" key={optionIndex}>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <input
                        type="radio"
                        name={`correct-${index}`} // Ensures radio buttons are grouped by question
                        checked={option.isCorrect} // Check if option is the correct one
                        onChange={() => {
                          setQuestions((prevQuestions) => {
                            const updatedQuestions = [...prevQuestions];
                            updatedQuestions[index] = {
                              ...updatedQuestions[index],
                              options: updatedQuestions[index].options.map((opt, i) => ({
                                ...opt,
                                isCorrect: i === optionIndex, // Mark this option as correct
                              })),
                            };
                            return updatedQuestions;
                          });
                        }}
                      />
                      <span className="ms-2">Correct</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mt-3">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  Remove Question
                </button>
                {questions.length < 8 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Update Quiz
          </button>
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

export default EditQuiz;
