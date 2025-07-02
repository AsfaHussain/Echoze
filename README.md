 💬 Echoze — Real-Time Chat Application

**Echoze** is a full-stack, real-time chat application built using the **MERN stack**, enhanced with **Socket.io** for seamless real-time communication, **Cloudinary** for image uploads, and **JWT** for secure user authentication and authorization. The frontend is styled using **TailwindCSS**, and global state is efficiently managed with **Zustand**. Both client and server include centralized error handling to ensure a robust and smooth experience.

---

## 📌 Features

- 🔐 Authentication & Authorization with **JWT**
- 💬 Real-Time Messaging using **Socket.io**
- 📤 Image Upload Support via **Cloudinary**
- 🟢 Online User Presence & Status Tracking
- 🧠 Global State Management with **Zustand**
- 🎨 Responsive UI powered by **TailwindCSS**
- ⚠️ Centralized Error Handling (Client & Server)
- ⚙️ RESTful API for smooth frontend-backend interaction

---

## 🚀 Tech Stack

### 🧩 Core Stack
- **MongoDB** – NoSQL database
- **Express.js** – Node.js backend framework
- **React.js** – Frontend library
- **Node.js** – Runtime environment

### ⚡ Additional Technologies
- **Socket.io** – Real-time bidirectional communication
- **Cloudinary** – Image uploads and optimization
- **JWT** – Secure authentication system
- **Zustand** – Lightweight state management
- **TailwindCSS** – Utility-first CSS framework
- **dotenv** – Environment variable manager
- **nodemon** – Development server auto-reloader

---

## 🗂️ Project Structure

```
echoze/
├── backend/               # Express backend with MongoDB, Cloudinary, JWT
│   ├── src/
│   ├── .env.example
│   └── package.json
├── frontend/              # React frontend with Zustand and TailwindCSS
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js and npm installed
- MongoDB Atlas account & connection URI
- Cloudinary account for image upload

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/echoze.git
cd echoze
```

---

### 🔙 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Now fill in your `.env` file with:

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Start the backend:

```bash
npm run dev
```

---

### 🔜 3. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Now fill in your frontend `.env` file with:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 📡 API Example

```http
POST   /api/auth/login          # Login user
POST   /api/messages            # Send a message
GET    /api/users/online        # Get online users
```

Use `fetch` or `axios` in frontend with environment-based URL:

```js
fetch(`${import.meta.env.VITE_API_URL}/api/messages`);
```

---





## 🔮 Future Enhancements

- ✅ Group Chat Functionality
- ✅ Typing Indicators
- ✅ Message Seen/Delivered Status
- ✅ Emojis & Reactions
- ✅ Voice Notes / File Sharing
- ✅ Dark Mode Toggle

---


