import React, { useState } from 'react';
import { signup } from '../services/authService';
import logo from '../icons/uet.jpg';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        semester: '',
        regNo: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data being sent:", formData);
        try {
            await signup(formData);
            alert('Signup successful!');
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            alert('Signup failed: ' + (error.response?.data?.error || error.message));
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
                <h2 className="mb-4">Signup</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

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

                    {/* Semester */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Semester</label>
                        <input
                            name="semester"
                            type="number"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter your semester"
                        />
                    </div>

                    {/* Registration Number */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Registration Number</label>
                        <input
                            name="regNo"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter your registration number"
                        />
                    </div>


                    {/* Role */}
                    <div className="mb-3 text-start">
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Signup Button */}
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </div>
                </form>

                {/* Login Link */}
                <div>
                    <span>Already have an account? </span>
                    <a
                        onClick={() => navigate('/login')}
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
