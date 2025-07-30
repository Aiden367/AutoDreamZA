# 🌐 AutoDream Web Application

> A modern, full-stack eCommerce web application specializing in the sale of vehicle parts. Designed for speed, scalability, and user experience, the platform features a sleek UI and robust backend architecture. Built with React, Node.js, TypeScript, and MongoDB, it supports secure payments via Stripe and PayPal, OTP-based user verification, Dockerized deployment, and a CI/CD pipeline powered by GitHub Actions.

![Project Screenshot](./images/screenshot.png) <!-- Replace with your image path -->




## 📌 Table of Contents

- [Context of the Project](#context-of-the-project)
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

## 🧠 Context of the Project

As a software engineer with a specialization in backend development, I created this project to challenge myself and grow in several key areas. My primary goal was to strengthen my frontend development skills by building a complete user interface using modern tools and best practices.

At the same time, I used this opportunity to deepen my backend expertise—exploring advanced database querying, implementing secure payment portals (Stripe and PayPal), and integrating an OTP system for sensitive user operations. This project also gave me hands-on experience with DevOps practices, including containerization with Docker and CI/CD workflows via GitHub Actions.

Building **AutoDream** has pushed me beyond my comfort zone, especially on the frontend, and significantly improved my development capabilities. As I continue to refine my skills through future personal projects, I plan to revisit and enhance this application with the goal of eventually launching it as a fully functional, production-ready eCommerce platform.

---

## 📖 About the Project

**AutoDream** is a full-stack eCommerce platform designed for selling automotive parts with a focus on performance, security, and modern design. It supports user registration, dynamic product listings, and a streamlined, secure checkout process. The platform integrates OTP-based verification for sensitive actions such as password resets and profile updates, and offers flexible payment options via Stripe and PayPal. Built with a scalable architecture and containerized using Docker, AutoDream also features a fully automated CI/CD pipeline powered by GitHub Actions for efficient deployment and delivery.

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

## Homepage
![Home_page](https://github.com/user-attachments/assets/5aec1097-8714-4512-af2a-744b3a775d77)

## Cart Page
![cart_page](https://github.com/user-attachments/assets/2307438d-68fb-4269-9898-a8f0fa572d18)

## Checkout Page
#### Shipping Address 
![shipping_address_page](https://github.com/user-attachments/assets/d4b8c84d-72d4-4a0b-95e2-a4478b30364e)
#### Payment with card
![payment_card_image](https://github.com/user-attachments/assets/58e8c659-e063-42ae-8ce8-c9c4b14b6ce3)
#### Payment with paypal
![payment_with_paypal](https://github.com/user-attachments/assets/5e132731-6a5b-4b42-a87c-7913f0c1b04d)
#### Payment Reciept
![payment_receipt](https://github.com/user-attachments/assets/1583b42c-7990-4a1b-920c-defc348a4571)

## Login Page
![Login_image](https://github.com/user-attachments/assets/cfb7e1d6-3ae4-4779-ba26-402e6fbb5201)
#### Forgot Password
![Forgot_Password](https://github.com/user-attachments/assets/dacd334b-4ed7-47f9-baad-6cd857eeb256)
#### Reset Password Email
![Reset_password_email](https://github.com/user-attachments/assets/5c7c67ab-8c12-4411-9b0a-c52035176915)
#### Reset Password Page
![New_password_image](https://github.com/user-attachments/assets/a9ff3c6b-80ac-4839-9101-657bd4636791)






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

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/autodream-app.git
cd autodream-app
