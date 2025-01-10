import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import logo from '../icons/uet.jpg'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            alert(response.data.message);
            // Check if the user is an admin
            if (response.data.user.role === 'admin') {
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            } else {
                console.log(response.data);
                localStorage.setItem('userId', response.data.user._id);
                navigate('/dashboard'); // Redirect to user dashboard (optional)
            }
        } catch (error) {
            alert('Login failed: ' + error.response.data.error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-3 text-center" style={{ maxWidth: '400px', width: '100%' }}>
                {/* Logo */}
                <div className="mb-4">
                    <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '120px' }} />
                </div>

                {/* Title */}
                <h2 className="mb-4">Login</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

                {/* Signup Link */}
                <div>
                    <span>Don't have an account? </span>
                    <a onClick={() => navigate('/signup')}
                        className="text-primary">Sign Up</a>
                </div>
            </div>
        </div>
    );

};

export default Login;
