import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X, Users, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://13.239.246.126:3000/api';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '', roll_no: '', batch: '', course: '', contact: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleOpenModal = (student = null) => {
    if (student) {
      setCurrentStudent(student);
      setFormData(student);
    } else {
      setCurrentStudent(null);
      setFormData({ name: '', roll_no: '', batch: '', course: '', contact: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        await axios.put(`${API_BASE_URL}/students/${currentStudent.id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/students`, formData);
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      alert('Error saving record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${id}`);
        fetchStudents();
      } catch (error) {
        alert('Error deleting record');
      }
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roll_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <div>
          <h1>Student <span>Portal</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage and track student academic records effectively.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          <span>Add New Student</span>
        </button>
      </header>

      <div className="controls-row">
        <div className="search-container">
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            className="search-input"
            placeholder="Search by name, roll number, or course..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-icon" title="Filter results">
          <Filter size={20} />
        </button>
      </div>

      <motion.div 
        className="table-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table>
          <thead>
            <tr>
              <th><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} /> Student Name</div></th>
              <th>Roll Number</th>
              <th>Course / Program</th>
              <th>Batch</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading records...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No student records found matching your search.</td></tr>
            ) : (
              filteredStudents.map((student, index) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td>
                    <div style={{ fontWeight: 600 }}>{student.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.contact}</div>
                  </td>
                  <td><span className="badge">{student.roll_no}</span></td>
                  <td>{student.course}</td>
                  <td>{student.batch}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn-icon" onClick={() => handleOpenModal(student)} title="Edit Record"><Edit2 size={16} /></button>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(student.id)} title="Delete Record"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{currentStudent ? 'Update Record' : 'Register Student'}</h2>
                <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>FULL NAME</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Bankim Kamila" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>ROLL NUMBER</label>
                    <input required value={formData.roll_no} onChange={e => setFormData({...formData, roll_no: e.target.value})} placeholder="e.g. CS2401" />
                  </div>
                  <div className="form-group">
                    <label>BATCH</label>
                    <input required value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="e.g. 2024" />
                  </div>
                </div>
                <div className="form-group">
                  <label>COURSE PROGRAM</label>
                  <input required value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} placeholder="e.g. B.Tech Computer Science" />
                </div>
                <div className="form-group">
                  <label>CONTACT NUMBER</label>
                  <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="e.g. +91 98765 43210" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-icon" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    {currentStudent ? 'Save Changes' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
