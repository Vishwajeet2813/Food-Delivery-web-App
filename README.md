#  Food Delivery Web App (Full Stack + DevOps)

##  Overview

This project is a **production-ready full-stack food delivery application** built using modern technologies and deployed with DevOps best practices.

It demonstrates:

* Scalable backend APIs
* Responsive frontend UI
* Containerized deployment
* CI/CD automation
* Monitoring & observability

---

##  Architecture

```
User
  ↓
NGINX (Reverse Proxy)
  ↓        ↓
Frontend   Backend (/api)
  ↓
MongoDB Atlas
  ↓
AWS S3 (Images)
```

---

##  Tech Stack

###  Frontend

* React.js
* Axios
* CSS

###  Backend

* Spring Boot
* Spring Security (JWT Authentication)
* REST APIs

###  Database

* MongoDB Atlas (Cloud Database)

###  DevOps & Deployment

* Docker & Docker Compose
* AWS EC2
* NGINX (Reverse Proxy)
* GitHub Actions (CI/CD Pipeline)

### Monitoring & Observability

* Prometheus (Metrics Collection)
* Grafana (Visualization Dashboard)

###  Cloud Services

* AWS S3 (Image Storage)

---

##  Project Structure

```
Food-Delivery-React-Java-Full-Stack/
│
├── foodies/              # User Frontend
├── adminpanel/           # Admin Frontend
├── foodiesapi/           # Backend (Spring Boot)
├── docker-compose.yml
├── nginx.conf
├── prometheus.yml
└── .github/workflows/    # CI/CD Pipeline
```

---

##  Features

###  User

* Register / Login
* Browse food items
* Add to cart
* Place orders
* View order history

###  Admin

* Add food items
* Manage orders
* Update order status

---

##  Docker Setup

###  Build & Run

```bash
docker-compose up --build -d
```

###  Stop

```bash
docker-compose down
```

---

##  Deployment (AWS EC2)

* Application hosted on AWS EC2
* Services run in Docker containers
* NGINX used as reverse proxy

###  Access

```
http://54.210.47.81
```

---

##  CI/CD Pipeline (GitHub Actions)

Pipeline automatically:

* Triggers on push to `main`
* SSH into EC2 instance
* Pull latest code
* Rebuild Docker containers
* Deploy updated application

---

##  Monitoring Setup

###  Prometheus

* Scrapes metrics from:

```
/actuator/prometheus
```

###  Grafana

* Visualizes:

  * JVM memory usage
  * CPU usage
  * API request metrics
  * Application performance

---

##  Environment Variables

Create a `.env` file:

```env
JWT_SECRET_KEY=your_secret_key
spring.data.mongodb.uri=your_mongodb_uri
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
```

---

##  Security

* JWT-based authentication
* CORS configuration
* Backend secured via Spring Security
* Sensitive data stored in `.env`

---

##  Useful Commands

###  View Logs

```bash
docker-compose logs -f
```

###  Check Containers

```bash
docker ps
```

###  Restart Services

```bash
docker-compose restart
```

---

##  Future Improvements

* Add HTTPS (SSL with domain)
* Implement zero-downtime deployment
* Add alerting system (Grafana alerts)
* Add container monitoring (cAdvisor)
* Integrate logging (ELK / Loki)
* Kubernetes deployment

---

##  What I Learned

* Full-stack development (React + Spring Boot)
* Docker containerization
* CI/CD pipeline using GitHub Actions
* Cloud deployment on AWS EC2
* Reverse proxy using NGINX
* Monitoring with Prometheus & Grafana
* Secure API design using JWT

---


##  Conclusion

This project demonstrates a **complete end-to-end DevOps pipeline**, combining application development, deployment, automation, and monitoring in a real-world scenario.

---
