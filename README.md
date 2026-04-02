# 🛒 Campus Cart

A peer-to-peer second-hand marketplace built exclusively for students of **G.L. Bajaj Institute of Technology and Management, Greater Noida**.

> Buy & Sell at GL Bajaj — by students, for students 🎓

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 📦 Post listings with image upload (Cloudinary)
- 🔍 Search and filter by category
- 💬 WhatsApp direct contact button
- 👤 Seller profile pages
- 🗑️ Manage and delete your own listings
- 📱 Fully responsive mobile-friendly UI

## 🗂️ Categories

Books • Electronics • Notes • Hostel Stuff • Cycles & Bikes • Clothes • Other

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|---|---|---|---|
| React + Vite | Node.js | MongoDB Atlas | Cloudinary |
| Tailwind CSS | Express.js | Mongoose | JWT Auth |
| React Router | REST API | | Bcrypt |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation
```bash
# Clone the repo
git clone https://github.com/Shreyayadav811/Campus-Cart.git
cd Campus-Cart

# Setup Backend
cd backend
npm install
# Create .env file with your credentials (see .env.example)
npm run dev

# Setup Frontend
cd ../frontend
npm install
npm run dev
```

### Environment Variables

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

## 📁 Project Structure
```
campus-cart/
├── backend/
│   ├── config/        # Cloudinary config
│   ├── middleware/    # JWT auth middleware
│   ├── models/        # User & Listing models
│   ├── routes/        # API routes
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Navbar, ListingCard, etc.
        ├── context/     # Auth context
        ├── pages/       # All page components
        └── utils/       # Axios instance
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/listings | Get all listings |
| POST | /api/listings | Create listing |
| DELETE | /api/listings/:id | Delete listing |
| GET | /api/users/:id | Get seller profile |

## 👩‍💻 Author

**Shreya Yadav** — GL Bajaj Institute of Technology and Management
