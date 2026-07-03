# Library Management System

A comprehensive web-based Library Management System built with **Node.js**, **Express**, and **MongoDB**. This application allows administrators to manage books and enables users to borrow books from the library.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

### Admin Features
- ✅ Manage book catalog (Add, Edit, Delete books)
- ✅ View all borrowers and their borrow history
- ✅ Monitor book availability and borrowing status
- ✅ Generate reports on library usage

### Borrower Features
- ✅ Browse available books in the library
- ✅ Borrow and return books
- ✅ View personal borrowing history
- ✅ Check book availability

### Authentication
- ✅ User registration and login
- ✅ Session-based authentication
- ✅ Role-based access control (Admin/Borrower)
- ✅ Secure logout functionality

## Tech Stack

- **Backend Framework:** Express.js (Node.js)
- **Database:** MongoDB with Mongoose ODM
- **Templating Engine:** EJS
- **Session Management:** express-session
- **Styling:** CSS
- **HTTP Method Override:** method-override
- **Environment Variables:** dotenv

## Project Structure

```
Library_Management_System_nodejs/
├── controllers/
│   ├── register.js        # User registration logic
│   ├── login.js           # User login logic
│   ├── logout.js          # User logout logic
│   ├── admin.js           # Admin operations
│   └── borrower.js        # Borrower operations
├── models/
│   ├── User.js            # User schema
│   ├── Book.js            # Book schema
│   └── BorrowRecord.js    # Borrow history schema
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── books.ejs
│   │   └── borrowers.ejs
│   └── borrower/
│       ├── dashboard.ejs
│       ├── browse.ejs
│       └── myBooks.ejs
├── css/
│   └── style.css          # Application styling
├── images/
│   └── [image assets]
├── app.js                 # Main application file
├── package.json           # Project dependencies
├── .env                   # Environment variables
└── .gitignore            # Git ignore file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas account)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/smit199/Library_Management_System_nodejs.git
   cd Library_Management_System_nodejs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```bash
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/library_management
   SECRETKEY=your_secret_key_here
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/library_management` |
| `SECRETKEY` | Session secret key | `your_secret_key_here` |

### MongoDB Connection

For local MongoDB:
```
MONGODB_URL=mongodb://localhost:27017/library_management
```

For MongoDB Atlas:
```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/library_management?retryWrites=true&w=majority
```

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. **Create an account:**
   - Click on the Register button
   - Enter your details (as Admin or Borrower)
   - Click Register

4. **Login:**
   - Enter your credentials
   - You'll be redirected based on your role

5. **Manage library:**
   - **Admin:** Access the admin dashboard to manage books and view borrowers
   - **Borrower:** Browse available books and manage your borrowing

## API Routes

### Authentication Routes
- `GET /login` - Display login page
- `POST /login` - Handle login
- `GET /register` - Display registration page
- `POST /register` - Handle user registration
- `GET /logout` - Logout user

### Admin Routes
- `GET /admin` - Admin dashboard
- `GET /admin/books` - View all books
- `POST /admin/books` - Add new book
- `PUT /admin/books/:id` - Update book details
- `DELETE /admin/books/:id` - Delete book
- `GET /admin/borrowers` - View all borrowers

### Borrower Routes
- `GET /borrower` - Borrower dashboard
- `GET /borrower/available` - Browse available books
- `POST /borrower/borrow/:bookId` - Borrow a book
- `POST /borrower/return/:bookId` - Return a book
- `GET /borrower/mybooks` - View borrowed books

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/borrower),
  createdAt: Date
}
```

### Book Schema
```javascript
{
  title: String,
  author: String,
  isbn: String (unique),
  copies: Number,
  availableCopies: Number,
  category: String,
  addedAt: Date
}
```

### Borrow Record Schema
```javascript
{
  borrowerId: ObjectId,
  bookId: ObjectId,
  borrowDate: Date,
  returnDate: Date,
  actualReturnDate: Date,
  status: String (borrowed/returned)
}
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Author:** [smit199](https://github.com/smit199)

**Created:** July 2022

For any questions or issues, please open an issue in the repository.
