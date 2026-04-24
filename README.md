# Food Delivery Web App (Full Stack + DevOps)
Overview - This is a full-stack food delivery application built using modern technologies and deployed with DevOps best practices.

The system includes:

User Frontend (React)
Admin Panel (React)
Backend API (Spring Boot)
Database (MongoDB Atlas)
Image Storage (AWS S3)
Deployment (Docker + AWS EC2 + NGINX)
CI/CD (GitHub Actions)

# Architecture
User
 ↓
NGINX (Reverse Proxy)
 ↓        ↓
Frontend   Backend (/api)
 ↓
MongoDB Atlas
 ↓
AWS S3 (Images)

# Tech Stack
🔹 Frontend
React.js
Axios
CSS
🔹 Backend
Spring Boot
Spring Security (JWT)
REST APIs
🔹 Database
MongoDB Atlas (Cloud)
🔹 DevOps
Docker & Docker Compose
AWS EC2
NGINX Reverse Proxy
GitHub Actions (CI/CD)
🔹 Cloud Services
AWS S3 (Image Storage)

# Project Structure
Food-Delivery-React-Java-Full-Stack/
│
├── foodies/          # User frontend
├── adminpanel/       # Admin frontend
├── foodiesapi/       # Backend (Spring Boot)
├── docker-compose.yml
├── nginx.conf
└── .github/workflows/deploy.yml

# Features
User Features
Register / Login
Browse food items
Add to cart
Place orders
View order history
Admin Features
Add food items
Manage orders
Update order status

# Docker Setup
Build & Run
docker-compose up --build -d
Stop Containers
docker-compose down

# Deployment (AWS EC2)
Hosted on AWS EC2 instance
Reverse proxy using NGINX
Frontend & Backend deployed using Docker
🔗 Access Application
http://54.210.47.81

# CI/CD Pipeline (GitHub Actions)

The pipeline automatically:

Triggers on push to main
SSH into EC2
Pull latest code
Rebuild Docker containers
Deploy updated application

# Environment Variables
Create a .env file:

JWT_SECRET_KEY=your_secret
spring.data.mongodb.uri=your_mongodb_uri
AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret

# Security
JWT-based authentication
CORS configuration
Backend secured behind NGINX
Sensitive data managed via .env
 Useful Commands
 View logs - docker-compose logs -f
Check running containers - docker ps
Restart services - docker-compose restart

# What I Learned
Full-stack development (React + Spring Boot)
Docker containerization
CI/CD pipeline using GitHub Actions
Cloud deployment on AWS EC2
Reverse proxy using NGINX
Secure API design using JWT


# Conclusion

This project demonstrates a production-ready full-stack deployment pipeline, combining development and DevOps practices in a real-world scenario.