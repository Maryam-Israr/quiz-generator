import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import logo from '../icons/uet.jpg';
import profileImg from '../icons/user.jpg';
import quizImg from '../icons/quiz.jpg'
//import notesImg from '../icons/book.jpg';
import resultImg from '../icons/result.jpg';
import logoutImg from '../icons/logout.jpg';
import '../index.css'

const UserDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* Logo */}
                <div className="dashboard-logo">
                    <img src={logo} alt="Logo" />
                </div>
    
                {/* Menu */}
                <div className="dashboard-menu">
                    <div className="menu-item" onClick={() => navigate('/profile')}>
                        <img src={profileImg} alt="Profile" />
                        <span>PROFILE</span>
                    </div>
                    <div className="menu-item" onClick={() => navigate('/dashboard/quizzes')}>
                        <img src={quizImg} alt="Quiz" />
                        <span>QUIZ</span>
                    </div>                   
                    <div className="menu-item" onClick={() => navigate('/dashboard/results')}>
                        <img src={resultImg} alt="Results" />
                        <span>RESULTS</span>
                    </div>
                    <div className="menu-item" onClick={() => navigate('/login')}>
                        <img src={logoutImg} alt="Log Out" />
                        <span>LOG OUT</span>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default UserDashboard;
