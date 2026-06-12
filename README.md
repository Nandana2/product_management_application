# Product Management Application

A full-stack MERN application for managing products, categories, and user wishlists. Built to practice real-world CRUD operations, authentication, file uploads, and database relationships.

## Features

* User Registration & Login (JWT Authentication)
* Product Management (Add, Edit, View Products)
* Multiple Product Variants (RAM, Price, Quantity)
* Category & Subcategory Management
* Wishlist Functionality
* Product Search & Pagination
* Image Upload with Multer
* Responsive UI with Toast Notifications

## Tech Stack

**Frontend**

* React.js (Vite)
* React Router DOM
* Axios
* React Bootstrap
* React Toastify

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* JWT
* bcryptjs

## Setup

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend/frontend
npm install
npm run dev
```

##NOTE:

Product images are currently stored in the local uploads/ folder. For production deployments, a cloud storage solution such as Cloudinary is recommended for better scalability and reliability.


## Author

Developed as a MERN Stack project to strengthen full-stack development skills, including authentication, file uploads, CRUD operations, and API integration.
