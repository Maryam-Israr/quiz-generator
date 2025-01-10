import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateSubject from './pages/Admin/CreateSubject';
import CreateQuiz from './pages/Admin/CreateQuiz';
import AdminDashboard from './pages/Admin/Dashboard';
import QuizzesList from './pages/Admin/QuizzesList';
import EditQuiz from './pages/Admin/EditQuiz';
import EditSubject from './pages/Admin/EditSubject'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Quizzes from './pages/quizzes'
import TakeQuiz from './pages/TakeQuiz'
import Result from './pages/Result'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/quizzes" element={<Quizzes />} />
        <Route path="/dashboard/quizzes/takequiz/:quizId" element={<TakeQuiz />} />
        <Route path="/dashboard/results" element={<Result/>} />


        <Route path="/admin/subject/create" element={<CreateSubject />} />
        <Route path="/admin/subject/edit/:subjectId" element={<EditSubject />} />

        <Route path="/admin/quiz/create" element={<CreateQuiz />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/quizzes" element={<QuizzesList />} />
        <Route path="/admin/quiz/edit/:quizId" element={<EditQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
