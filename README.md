# 🚀 GigFlow - Full Stack Freelance Marketplace

A modern full-stack freelance marketplace application built with the MERN stack, featuring real-time notifications, secure authentication, and robust transaction handling.

## 📋 Features

### Core Features
- ✅ **User Authentication** - JWT-based auth with HttpOnly cookies
- ✅ **Dual Role System** - Users can act as both Clients and Freelancers
- ✅ **Gig Management** - Create, browse, and search gigs
- ✅ **Bidding System** - Submit competitive bids on projects
- ✅ **Secure Hiring** - Atomic hiring process with MongoDB transactions
- ✅ **Real-time Notifications** - Socket.io powered instant updates

### Technical Highlights
- 🔒 **Secure Authentication** - bcrypt password hashing & JWT tokens
- 🔄 **Race Condition Handling** - MongoDB transactions for data consistency
- ⚡ **Real-time Updates** - Socket.io for instant notifications
- 🎨 **Modern UI** - Tailwind CSS with responsive design
- 📦 **State Management** - Redux Toolkit for global state
- 🛡️ **Protected Routes** - Role-based access control

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)** - Fast and modern React development
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Socket.io** - Real-time engine
- **Cookie Parser** - Parse HTTP cookies

## 📁 Project Structure

```
GigFlow/
├── Freelance/                 # Frontend Application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── BidModal.jsx
│   │   │   ├── BidsList.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── NotificationHandler.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Gigs.jsx
│   │   │   ├── CreateGig.jsx
│   │   │   └── GigDetails.jsx
│   │   ├── redux/           # Redux state management
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── gigSlice.js
│   │   ├── services/        # API services
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Server/                   # Backend Application
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gigController.js
│   │   └── bidController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gigRoutes.js
│   │   └── bidRoutes.js
│   ├── utils/
│   │   └── tokenUtils.js
│   ├── server.js
│   ├── .env
│   └── package.json
```

## � Complete Documentation

This project includes comprehensive documentation to help you understand and work with the codebase:

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions and troubleshooting
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference with examples
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Architecture and code organization
- **[SYSTEM_DIAGRAMS.md](SYSTEM_DIAGRAMS.md)** - Visual diagrams of system architecture
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and code snippets
- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Step-by-step setup verification
- **[MONGODB_VS_SEQUELIZE.md](MONGODB_VS_SEQUELIZE.md)** - MongoDB vs SQL comparison
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete implementation summary

## �🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd E:\Projetcs_Access\GigFlow
```

2. **Setup Backend**
```bash
cd Server
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the Server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Setup Frontend**
```bash
cd ../Freelance
npm install
```

### Running the Application

1. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

2. **Start Backend Server**
```bash
cd Server
npm run dev
# Server will run on http://localhost:5000
```

3. **Start Frontend Development Server**
```bash
cd Freelance
npm run dev
# Frontend will run on http://localhost:5173
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🌐 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |

### Gig Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gigs` | Get all open gigs | Public |
| GET | `/api/gigs/:id` | Get single gig | Public |
| POST | `/api/gigs` | Create new gig | Private |

### Bid Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bids` | Submit bid | Private |
| GET | `/api/bids/:gigId` | Get bids for gig | Private (Owner) |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer | Private (Owner) |

## 🔑 Key Features Explained

### 1. Authentication System
- JWT tokens stored in HttpOnly cookies for security
- Password hashing using bcrypt
- Protected routes with middleware

### 2. Bidding System
- One bid per freelancer per gig
- Bid statuses: `pending`, `hired`, `rejected`
- Prevents gig owners from bidding on their own gigs

### 3. Hiring Logic with Transactions
```javascript
// When a client hires a freelancer:
1. Gig status: open → assigned
2. Selected bid: pending → hired
3. Other bids: pending → rejected
// All in a single atomic transaction!
```

### 4. Real-time Notifications
- Socket.io connection when user logs in
- Instant notification when hired
- User-specific notification rooms

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  timestamps: true
}
```

### Gig Model
```javascript
{
  title: String,
  description: String,
  budget: Number,
  ownerId: ObjectId (ref: User),
  status: "open" | "assigned",
  timestamps: true
}
```

### Bid Model
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  message: String,
  price: Number,
  status: "pending" | "hired" | "rejected",
  timestamps: true
}
```

## 🎨 UI Screens

1. **Home Page** - Landing page with features overview
2. **Browse Gigs** - View all available gigs with search
3. **Gig Details** - Detailed view with bidding option
4. **Create Gig** - Form to post new gigs
5. **Login/Signup** - Authentication pages
6. **Bid Management** - View and manage bids (for gig owners)

## 🔐 Security Features

- ✅ HttpOnly cookies prevent XSS attacks
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token expiration
- ✅ Protected API routes
- ✅ Owner-only access control
- ✅ Input validation

## 🚧 Future Enhancements

- [ ] User profiles with ratings and reviews
- [ ] Payment integration (Stripe/PayPal)
- [ ] File upload for project attachments
- [ ] Chat system between clients and freelancers
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] Dashboard with analytics
- [ ] Admin panel

## 📝 Notes

- **MongoDB Transactions**: Requires MongoDB replica set (MongoDB 4.0+) for production
- **Environment Variables**: Update JWT_SECRET in production
- **CORS**: Currently configured for local development
- **Socket.io**: Handles reconnection automatically

