// pages/Admin/CreateSubject.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaEdit, FaTrash } from 'react-icons/fa'; // Using react-icons for the Home icon



function CreateSubject() {
  const [name, setName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [message, setMessage] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  // Fetch subjects
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

  // Handle create subject
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/subjects/create', { name, courseCode });
      setMessage(`Subject created successfully: ${response.data.name}`);
      setSubjects((prevSubjects) => [...prevSubjects, response.data]);
      setName('');
      setCourseCode('');
    } catch (error) {
      setMessage('Error creating subject');
    }
  };

  // Handle delete subject
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));
      setMessage('Subject deleted successfully');
    } catch (error) {
      console.error('Error deleting subject:', error);
      setMessage('Failed to delete subject');
    }
  };
  
  return (
    <div className="container mt-5">
      {/* Form Section */}
      <div className="card shadow-lg p-4 rounded-3 mb-4">
        <h2 className="text-center mb-4">Create New Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center g-2">
            {/* Subject Name */}
            <div className="col-md-4">
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
            <div className="col-md-4">
              <label className="form-label">Course Code</label>
              <input
                type="text"
                className="form-control"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Enter course code"
              />
            </div>
            {/* Create Button */}
            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Create Subject
              </button>
            </div>
          </div>
        </form>
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

      {/* Subject List */}
      <div className="card shadow-lg p-4 rounded-3">
        <h3 className="mb-3">Subject List</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject._id}>
                <td>{index + 1}</td>
                <td>{subject.name}</td>
                <td>{subject.courseCode}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => navigate(`/admin/subject/edit/${subject._id}`)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(subject._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {subjects.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No subjects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CreateSubject;
