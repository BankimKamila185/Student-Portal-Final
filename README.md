# Student Management Portal

A full-stack web application for managing student records, built as a Cloud Computing Capstone Project.

## 🚀 Quick Start (Local)

### 1. Prerequisites
- Node.js (v16+)
- MySQL Server running locally

### 2. Backend Setup
```bash
cd server
npm install
# Update .env with your local MySQL credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The app will be available at `http://localhost:3000`.

## ☁️ AWS Deployment
Follow the detailed **[Deployment Guide](./deployment_guide.md)** or see the artifact in your AI chat.

## 📂 Project Structure
- `client/`: React + Vite frontend
- `server/`: Node.js + Express + MySQL backend
- `architecture_diagram.md`: Project architecture visualization
- `command_log.md`: History of setup commands
- `implementation_plan.md`: Technical roadmap

## 🔑 Database Schema
```sql
CREATE TABLE Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    batch VARCHAR(50),
    course VARCHAR(100),
    contact VARCHAR(20)
);
```
