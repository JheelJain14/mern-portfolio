# Jheel Jain – Full Stack MERN Portfolio

A modern, responsive, and production-ready personal portfolio built for **Jheel Jain** (Computer Science Engineering Student & Aspiring Full Stack Developer). 

This project is structured as a full-stack **MERN** application with an interactive **Vite + React** frontend and a robust **Node.js + Express + MongoDB** backend.

---

## 🌟 Key Features

### Frontend (`/client`)
- **Modern Responsive Design**: Engineered with a curated glassmorphic dark/light design system, fluid typography, and subtle ambient glows.
- **Hero Section**: Complete with animated profile cards, floating badges, social media links (GitHub, LinkedIn, Email), and direct call-to-actions.
- **Interactive CV Download**: Modal supporting both **PDF** (`.pdf`) and **Word** (`.docx`) resume downloads with clear file replacement guides.
- **Dynamic Skills & Progress**: Categorized into *Frontend*, *Backend*, *Database*, and *Tools & Technologies* with animated progress indicators.
- **Featured Projects Grid**:
  1. **College LMS Dashboard** — React.js, Next.js, TypeScript, MongoDB
  2. **Transport Management System** — HTML, CSS, JavaScript, Node.js, MySQL
  3. **Female Unemployment Analysis** — Python, Pandas, Data Analysis
- **Education & Experience Timeline**: Academic milestones at JK Lakshmipat University, Jaipur alongside technical leadership experience.
- **Certifications & Achievements**: Includes HackJKLU 2025 Coordinator, Spardha, and Sabrang 2024 & 2025 Coordination roles.
- **Connected Contact Form**: Fully integrated with the backend API to submit inquiries directly to MongoDB with instant validation and feedback toasts.
- **Theme Switcher**: Smooth Dark/Light mode toggle with `localStorage` persistence.
- **Mobile Responsive Drawer**: Hamburger menu optimized for phones, tablets, and desktops.

### Backend (`/server`)
- **Express & Node.js API**: Modular architecture separating models, routes, and controllers.
- **MongoDB & Mongoose**: Validated Contact schema storing `name`, `email`, `message`, and `createdAt` timestamps.
- **Safe Graceful Degradation**: Server detects database availability and handles disconnections gracefully without crashing.
- **CV Static & Route Delivery**: Endpoints for resume info and direct binary downloads.
- **CORS & Environment Variables**: Configured for local development and ready for production deployment.

---

## 📁 Project Structure

```text
mern-portfolio/
├── client/                     # Vite + React Frontend
│   ├── public/
│   │   ├── cv/                 # Resume files (PDF & DOCX)
│   │   │   ├── Jheel_Jain_Resume.pdf
│   │   │   ├── Jheel_Jain_Resume.docx
│   │   │   └── README.md       # Resume placement instructions
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   └── Icons.jsx       # Custom SVG Icons (GitHub, LinkedIn, Word)
│   │   ├── App.css             # Glassmorphism, animations & responsiveness
│   │   ├── App.jsx             # Main portfolio component & routing
│   │   ├── index.css           # Global tokens & theme variables
│   │   └── main.jsx            # React root mount
│   ├── index.html              # SEO metadata & Google Fonts
│   ├── vite.config.js          # Vite config with /api proxy to server
│   ├── package.json
│   └── .gitignore
│
├── server/                     # Node.js + Express Backend
│   ├── models/
│   │   └── Contact.js          # Mongoose Contact model
│   ├── routes/
│   │   ├── contact.js          # POST /api/contact & GET /api/contact
│   │   └── cv.js               # GET /api/cv/download/:format & /api/cv/info
│   ├── .env                    # Local environment variables (ignored in git)
│   ├── .env.example            # Sample environment variables template
│   ├── server.js               # Express application entrypoint
│   ├── package.json
│   └── .gitignore
│
├── .gitignore                  # Root gitignore (excludes node_modules & .env)
├── package.json                # Root scripts to orchestrate client & server
└── README.md                   # Complete documentation
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Framer Motion, Lucide Icons, React Router DOM |
| **Styling** | Vanilla CSS (CSS Custom Properties, Glassmorphism, Responsive Flex/Grid) |
| **Backend** | Node.js, Express.js, Mongoose, CORS, Dotenv |
| **Database** | MongoDB (Local MongoDB Community Server or MongoDB Atlas) |
| **Typography** | Plus Jakarta Sans, Inter, Fira Code |

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <repo-folder>
```

### 2. Configure Environment Variables
Inside `server/`, copy `.env.example` to `.env`:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and configure your settings:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
CLIENT_URL=http://localhost:5173
```
*(For MongoDB Atlas, paste your cloud connection string into `MONGODB_URI`)*.

---

## 🚀 Running the Project

You can run both client and server from their respective directories or from the root:

### Option A: From Root Directory
```bash
# Install all dependencies (both client and server)
npm run install:all

# Run backend server (in one terminal)
npm run server

# Run frontend development server (in another terminal)
npm run client
```

### Option B: Running Separately

#### Start Backend:
```bash
cd server
npm install
npm run dev
# Server will start on http://localhost:5000
```

#### Start Frontend:
```bash
cd client
npm install
npm run dev
# Client will start on http://localhost:5173
```

---

## 📡 Backend API Reference

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "service": "Jheel Jain Portfolio API",
    "database": {
      "status": "Connected",
      "readyState": 1,
      "connected": true
    }
  }
  ```

### 2. Submit Contact Form
- **Endpoint**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "message": "Hi Jheel, I would love to connect with you about an opportunity."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Thank you! Your message has been sent successfully.",
    "data": {
      "id": "67...",
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "createdAt": "2026-10-20T..."
    }
  }
  ```

### 3. CV & Resume Endpoints
- `GET /api/cv/info` — Returns metadata on available resume formats.
- `GET /api/cv/download/pdf` — Downloads `Jheel_Jain_Resume.pdf`.
- `GET /api/cv/download/docx` — Downloads `Jheel_Jain_Resume.docx`.

---

## 📄 Managing Your Resume Files

Place your actual resume files directly into:
```
client/public/cv/Jheel_Jain_Resume.pdf
client/public/cv/Jheel_Jain_Resume.docx
```
- Keep the filenames exact so both the static download buttons and server download routes automatically serve your latest documents without modifying any code.

---

## 🚢 Deployment Guide

### Deploying Frontend (Vercel / Netlify)
1. Push your repository to GitHub.
2. Link the repository to **Vercel** or **Netlify**.
3. Set **Root Directory** to `client`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variable (if your backend is deployed):
   - `VITE_API_BASE_URL`: URL of your deployed backend (e.g. `https://your-api.onrender.com`).

### Deploying Backend (Render / Railway)
1. Link your repository to **Render** (Web Service) or **Railway**.
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add Environment Variables:
   - `PORT`: `5000` (or host provided port)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CLIENT_URL`: Your deployed frontend URL (e.g. `https://jheel-portfolio.vercel.app`)

---

## 🔒 Security & Git Hygiene
- `.env` files are strictly excluded via `.gitignore` in both root and subdirectories.
- No sensitive credentials or database passwords should ever be committed to git.
- MongoDB connection strings in `.env` are shielded and logs redact sensitive tokens.

---

## 👤 Author
**Jheel Jain**  
- B.Tech in Computer Science & Engineering, JK Lakshmipat University, Jaipur  
- Aspiring Full Stack Developer  
- Email: `jheeljain@example.com`
