import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Using react-icons for the Home icon
import './profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        semester: '',
        regNo: '',
        password: '', // Optional: for updating password if needed
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/login'); // Redirect if userId is not found
                return;
            }

            try {
                const response = await axios.get(`https://backend-express-inky.vercel.app/api/users/${userId}`);
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/login'); // Redirect if error occurs
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
console.log(profileData);
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.put(`https://backend-express-inky.vercel.app/api/users/${userId}`, profileData);
            console.log('Response:', response.data);
            setProfileData(response.data);
            setIsEditing(false); // Toggle edit mode off
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true); // Toggle to edit mode
    };

    if (loading) {
        return <div className="profile-container">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <form onSubmit={handleSubmit}>
                    <div className="profile-details">
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="number"
                                    name="semester"
                                    value={profileData.semester}
                                    onChange={handleChange}
                                    placeholder="Semester"
                                    required
                                />
                                <input
                                    type="text"
                                    name="regNo"
                                    value={profileData.regNo}
                                    onChange={handleChange}
                                    placeholder="Registration Number"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={profileData.password}
                                    onChange={handleChange}
                                    placeholder="Password (Optional for update)"
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>{profileData.name}</h2>
                                <p><strong>Username:</strong> {profileData.name}</p>
                                <p><strong>Email:</strong> {profileData.email}</p>
                                <p><strong>Semester:</strong> {profileData.semester}</p>
                                <p><strong>Registration Number:</strong> {profileData.regNo}</p>
                                <p><strong>Password:</strong> {profileData.password}</p>
                            </div>
                        )}
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <button type="submit">Save</button>
                        ) : (
                            <a className="btn btn-primary" onClick={handleEditClick}>
                                Edit Profile
                            </a>
                        )}
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
                </form>
            </div>
        </div>
    );
};

export default Profile;
