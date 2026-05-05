const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Create Students table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    batch VARCHAR(50),
    course VARCHAR(100),
    contact VARCHAR(20)
)`;

db.query(createTableQuery, (err) => {
    if (err) console.error('Error creating table:', err);
});

// CRUD Endpoints

// Create
app.post('/api/students', (req, res) => {
    const { name, roll_no, batch, course, contact } = req.body;
    const query = 'INSERT INTO Students (name, roll_no, batch, course, contact) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, roll_no, batch, course, contact], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

// Read (All)
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Read (One)
app.get('/api/students/:id', (req, res) => {
    db.query('SELECT * FROM Students WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Student not found' });
        res.json(result[0]);
    });
});

// Update
app.put('/api/students/:id', (req, res) => {
    const { name, roll_no, batch, course, contact } = req.body;
    const query = 'UPDATE Students SET name = ?, roll_no = ?, batch = ?, course = ?, contact = ? WHERE id = ?';
    db.query(query, [name, roll_no, batch, course, contact, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student updated successfully' });
    });
});

// Delete
app.delete('/api/students/:id', (req, res) => {
    db.query('DELETE FROM Students WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student deleted successfully' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
