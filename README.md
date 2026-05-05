# 🏛️ Cloud-Native Student Management Portal

### **Cloud Computing Capstone Project**
**Developer:** Bankim Chandra Kamila  
**Roll No:** 150096724084  
**Cohort:** Mark Zuckerberg  
**Deployment URL:** [http://13.239.246.126/](http://13.239.246.126/)

---

## 📄 Project Overview
The **Student Management Portal** is a full-stack, cloud-hosted application designed to streamline the administration of academic records. Built with a focus on high availability, performance, and modern UI/UX, this portal allows administrators to perform full **CRUD (Create, Read, Update, Delete)** operations on student data within a secure AWS cloud environment.

### **Core Objectives**
- **Autonomous Management**: Enable instant record updates without manual database intervention.
- **Cloud Reliability**: Hosted on AWS to ensure 24/7 accessibility and data persistence.
- **Modern Performance**: Utilizing an event-driven Nginx/Node.js architecture for sub-second response times.

---

## 🛠️ Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Cloud Infrastructure** | **AWS EC2 (Ubuntu 22.04)** | Virtualized hardware and OS hosting. |
| **Web Server** | **Nginx** | High-performance reverse proxy and static file hosting. |
| **Backend Engine** | **Node.js + Express.js** | RESTful API development and database routing. |
| **Database** | **MySQL** | Persistent, relational data storage. |
| **Frontend UI** | **React.js + Vite** | Component-based modern user interface. |
| **Animation Engine** | **Framer Motion** | Premium micro-interactions and transitions. |
| **Process Manager** | **PM2** | Persistent backend execution and auto-restart. |

---

## 🏗️ System Architecture & Workflow

### **1. Infrastructure (AWS)**
The application resides within a secure VPC on AWS.
- **Security Groups**: Configured with strict Inbound Rules.
  - **Port 80 (HTTP)**: Public web access.
  - **Port 3000 (API)**: Communication between Frontend and Backend.
  - **Port 22 (SSH)**: Secure administrative access.
  - **Port 3306 (MySQL)**: Restricted to Localhost for data security.

### **2. Data Flow**
1. **Request**: The user interacts with the React frontend.
2. **Proxy**: Nginx receives the request on Port 80 and serves the static React files.
3. **API Call**: React makes an asynchronous `axios` call to the Node.js API on Port 3000.
4. **Processing**: Node.js validates the request and queries the MySQL database.
5. **Response**: Data is sent back through the layers and rendered instantly in the dashboard.

---

## 🗄️ Database Schema
The project utilizes a normalized relational schema within MySQL:

```sql
CREATE TABLE Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    batch VARCHAR(50) NOT NULL,
    course VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment Process (The "A to Z" Workflow)

### **Step A: Environment Setup**
- Launch EC2 Ubuntu Instance.
- Install Node.js, MySQL-Server, and Nginx.
- Configure `mysql_secure_installation`.

### **Step B: Backend Deployment**
- Clone repository and install dependencies (`npm install`).
- Configure `.env` with database credentials.
- Launch server using PM2: `pm2 start index.js --name student-api`.

### **Step C: Frontend Build & Serve**
- Run `npm run build` locally to generate the optimized `/dist` folder.
- Use `scp` to transfer files to `/var/www/html/` on the AWS instance.
- Configure Nginx to serve the site on Port 80.

---

## 🌟 Key Features Implemented
- **Modern SaaS UI**: A professional, dark-themed dashboard with electric indigo accents.
- **Dynamic Search**: Filter thousands of records instantly by Name or Roll Number.
- **Real-time Analytics**: Visual insights into database health and student demographics.
- **Responsive Layout**: Optimized for Desktop, Tablet, and Mobile devices.
- **Automated Process Recovery**: PM2 ensures the application never goes down, even after a server crash.

---

## 🔒 Security Measures
- **Password Masking**: Environment variables used for database security.
- **Port Isolation**: Database port (3306) blocked from public access.
- **Reverse Proxy**: Nginx hides the internal Node.js port from direct user interaction.

---

## 🎯 Future Enhancements
- **JWT Authentication**: Secure admin login system.
- **SSL/TLS Encryption**: Transition from HTTP to HTTPS using Certbot.
- **File Uploads**: Support for student profile pictures via AWS S3.

---

**© 2024 Bankim Chandra Kamila | Cloud Computing Capstone**
