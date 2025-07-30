# 🌐 AutoDream Web Application

> A full-stack, production-ready web application for managing users, products, and secure payments. Built with React, Node.js, TypeScript, and MongoDB. Features Stripe/PayPal payments, OTP verification, Dockerized services, and GitHub Actions CI/CD.

![Project Screenshot](./images/screenshot.png) <!-- Replace with your image path -->

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 About the Project

**AutoDream** is a full-stack web platform for handling user registration, product listings, and secure checkout experiences. It includes modern security measures like OTP verification for password reset and profile changes, uses Stripe & PayPal for handling payments, and deploys using Docker and GitHub Actions CI/CD.

---

## 🚀 Features

- ✅ JWT-based authentication
- ✅ Secure OTP system for password reset & data updates
- ✅ Product CRUD operations
- ✅ Payment gateways: **Stripe** & **PayPal**
- ✅ CI/CD pipeline via **GitHub Workflows**
- ✅ Dockerized backend services
- ✅ Rate limiting & security headers
- ✅ Cheerio web scraping functionality
- ✅ Health check endpoint for uptime monitoring

---

## 📸 Screenshots

### Homepage
![Homepage](./images/homepage.png)

### Payment Integration
![Payment](./images/payment.png)

---

## 🧰 Tech Stack

| Frontend           | Backend            | Database | Security                   | Payments        | DevOps              |
|--------------------|--------------------|----------|-----------------------------|------------------|---------------------|
| React (TypeScript) | Node.js + Express  | MongoDB  | Helmet, xss-clean, RateLimit | Stripe, PayPal   | Docker + GitHub Actions |

---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/autodream-app.git
cd autodream-app
