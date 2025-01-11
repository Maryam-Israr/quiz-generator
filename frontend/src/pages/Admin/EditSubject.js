import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaHome } from 'react-icons/fa';

function EditSubject() {
  const { subjectId } = useParams(); // Get the subject ID from the URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [message, setMessage] = useState('');

  // Fetch subject details on load
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`https://backend-express-inky.vercel.app/api/subjects/${subjectId}`);
        setName(response.data.name);
        setCourseCode(response.data.courseCode);
      } catch (error) {
        console.error('Error fetching subject details:', error.message);
        setMessage('Failed to load subject details');
      }
    };

    fetchSubject();
  }, [subjectId]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://backend-express-inky.vercel.app/api/subjects/${subjectId}`, {
        name,
        courseCode,
      });
      setMessage(response.data.message);
      navigate('/admin'); // Redirect back to admin/dashboard
    } catch (error) {
      console.error('Error updating subject:', error.response?.data?.message || error.message);
      setMessage('Failed to update subject');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow-lg p-4 rounded-3">
        <h2 className="text-center mb-4">Edit Subject</h2>
        <form onSubmit={handleUpdate}>
          {/* Subject Name */}
          <div className="mb-3">
            <label className="form-label">Subject Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter subject name"
            />
          </div>
  
          {/* Course Code */}
          <div className="mb-3">
            <label className="form-label">Course Code</label>
            <input
              type="text"
              className="form-control"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Enter course code"
            />
          </div>
  
          {/* Update Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              <FaSave /> Update Subject
            </button>
          </div>
        </form>
  
        {/* Message Display */}
        {message && <div className="mt-3 text-center text-success">{message}</div>}
  
        {/* Home Button */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/admin')}
            title="Go to Dashboard"
          >
            <FaHome size={24} /> Home
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default EditSubject;
