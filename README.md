# Blogging Website Backend

## Overview
This is the backend for a blogging website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides APIs for user authentication, blog creation, comments, and other features required for a blogging platform.

## Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Data Modeling) for MongoDB
- **JWT (JSON Web Token)** - Authentication
- **Cloudinary** (Optional) - Image storage

## Features
- User authentication (Signup/Login with JWT)
- Blog post creation, editing, and deletion
- Comments and likes on blog posts
- User profile management
- Middleware for authentication and error handling

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/98ZAFAR/BloggingProjectBackend.git
   cd BloggingProjectBackend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name (if using Cloudinary)
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. **Run the server**
   ```sh
   npm start
   ```
   The backend will start on `http://localhost:5000`.

## API Endpoints

### General
| Method | Endpoint | Description | Protected |
|--------|---------|-------------|------------|
| GET    | `/posts` | Get all posts | No |
| GET    | `/posts/:id` | Get single post | No |

### Authentication
| Method | Endpoint        | Description          | Protected |
|--------|----------------|----------------------|------------|
| POST   | `/api/user/signup` | Register a new user | No |
| POST   | `/api/user/login`  | Authenticate user   | No |

### Blog Posts
| Method | Endpoint         | Description             | Protected |
|--------|-----------------|-------------------------|------------|
| GET    | `/api/post`    | Get all blog posts     | Yes |
| GET    | `/api/post/:id` | Get single blog post  | Yes |
| POST   | `/api/post`    | Create a new blog post | Yes |
| PUT    | `/api/post/:id` | Update a blog post    | Yes |
| DELETE | `/api/post/:id` | Delete a blog post    | Yes |
| POST   | `/api/post/:id/likes` | Like a blog post | Yes |

### Comments
| Method | Endpoint                | Description                 | Protected |
|--------|-------------------------|-----------------------------|------------|
| POST   | `/api/comment/:postId` | Add a comment to a blog     | Yes |
| GET    | `/api/comment/:postId` | Get all comments for a blog | No |
| POST   | `/api/comment/:commentId/likes` | Like a comment | Yes |

## Contributing
Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.

## Contact
For any queries, reach out to:
- **GitHub**: [98ZAFAR](https://github.com/98ZAFAR)
- **Email**: mdzafar.dev@gmail.com