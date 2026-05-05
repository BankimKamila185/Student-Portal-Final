import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X, User, GraduationCap, Calendar, Phone, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    batch: '',
    course: '',
    contact: ''
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
      alert('Error saving student: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_BASE_URL}/students/${id}`);
        fetchStudents();
      } catch (error) {
        alert('Error deleting student');
      }
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>Student Portal</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Cloud Computing Capstone Project</p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search records..." 
              style={{ paddingLeft: '2.8rem', width: '300px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={18} /> Add Student
          </button>
        </div>
      </header>

      <motion.div 
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Roll No</th>
                <th>Batch</th>
                <th>Course</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>Loading records...</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>No records found.</td></tr>
              ) : (
                filteredStudents.map((student) => (
                  <motion.tr 
                    key={student.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <User size={20} color="var(--primary)" />
                        </div>
                        <span style={{ fontWeight: '500' }}>{student.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-blue">{student.roll_no}</span></td>
                    <td>{student.batch}</td>
                    <td>{student.course}</td>
                    <td>{student.contact}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-icon" onClick={() => handleOpenModal(student)}><Edit2 size={16} /></button>
                        <button className="btn-icon btn-danger" onClick={() => handleDelete(student.id)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2>{currentStudent ? 'Edit Student' : 'Add New Student'}</h2>
                <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label><User size={14} style={{ marginRight: '4px' }} /> Full Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter student name"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label><Hash size={14} style={{ marginRight: '4px' }} /> Roll Number</label>
                    <input 
                      required
                      value={formData.roll_no}
                      onChange={e => setFormData({...formData, roll_no: e.target.value})}
                      placeholder="e.g. CS101"
                    />
                  </div>
                  <div className="form-group">
                    <label><Calendar size={14} style={{ marginRight: '4px' }} /> Batch</label>
                    <input 
                      required
                      value={formData.batch}
                      onChange={e => setFormData({...formData, batch: e.target.value})}
                      placeholder="e.g. 2024"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label><GraduationCap size={14} style={{ marginRight: '4px' }} /> Course</label>
                  <input 
                    required
                    value={formData.course}
                    onChange={e => setFormData({...formData, course: e.target.value})}
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div className="form-group">
                  <label><Phone size={14} style={{ marginRight: '4px' }} /> Contact</label>
                  <input 
                    required
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn btn-icon" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    {currentStudent ? 'Update Record' : 'Save Record'}
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
