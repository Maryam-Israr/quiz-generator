// pages/Admin/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import quizIcon from '../../icons/quiz.jpg';
import subjectIcon from '../../icons/book.jpg';
import resultIcons from '../../icons/result.jpg';
import '../../index.css';


function AdminDashboard() {
  const navigate = useNavigate();

  const handleCreateSubject = () => {
    navigate('/admin/subject/create');
  };

  const handleCreateQuiz = () => {
    navigate('/admin/quiz/create');
  };

  const navigateToQuizList = () => {
    navigate('/admin/quizzes');
  };

  return (
    <div className="admin-dashboard-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="admin-dashboard-container p-5 shadow-lg">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button 
            className="btn shadow-lg" 
            style={{ 
              borderRadius: '10px', 
              backgroundColor: 'white', 
              borderColor: 'white', 
              textAlign: 'center'
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={handleCreateSubject}
          >
            <img src={subjectIcon} alt="Create Subject" width={80} />
            <h5 style={{ color: 'rgb(201, 139, 82)' }}>Create Subject</h5>
          </button>
  
          <button 
            className="btn shadow-lg" 
            style={{ 
              borderRadius: '10px', 
              backgroundColor: 'white', 
              borderColor: 'white', 
              textAlign: 'center'
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={handleCreateQuiz}
          >
            <img src={quizIcon} alt="Create Quiz" width={80} />
            <h5 style={{ color: 'rgb(201, 139, 82)' }}>Create Quiz</h5>
          </button>
  
          <button 
            className="btn shadow-lg" 
            style={{ 
              borderRadius: '10px', 
              backgroundColor: 'white', 
              borderColor: 'white', 
              textAlign: 'center'
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            onClick={navigateToQuizList}
          >
            <img src={resultIcons} alt="View Quizzes" width={80} />
            <h5 style={{ color: 'rgb(201, 139, 82)' }}>View Quizzes</h5>
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default AdminDashboard;
