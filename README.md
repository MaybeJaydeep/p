# 🎯 PlacedPrep

> **AI-powered Job Description Analyzer** — Paste or upload any JD, get instant skill extraction, role inference, learning roadmap, and company insights.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-19-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [NLP Pipeline](#nlp-pipeline)
- [Pages & Routes](#pages--routes)
- [Contributing](#contributing)

---

## Overview

**PlacedPrep** is a full-stack web application that helps students and job-seekers decode job descriptions instantly. It uses a custom NLP pipeline to:

- Extract **skills** mentioned in any JD (ranked by frequency/weight)
- **Categorize** them across Frontend, Backend, Languages, DevOps, ML/AI, Testing, and more
- **Infer the job role** (e.g., Full Stack Developer, Data Engineer, ML Engineer)
- Generate a **phase-based learning roadmap** from beginner → advanced
- Enrich results with **real company info** (summary, thumbnail, Wikipedia link) via the Wikipedia REST API
- Produce a **dynamic AI-style summary** of the JD

All data is stored per-user with JWT authentication, so you can build a personal library of analyzed job descriptions.

---

## Features

| Feature | Description |
|---|---|
| 📄 **JD Upload** | Paste raw text or upload a PDF/image of a JD |
| 🔍 **Skill Extraction** | Identifies 100+ skills across 10+ categories with frequency weighting |
| 🗺️ **Learning Roadmap** | Phase-ordered roadmap (Beginner → Intermediate → Advanced) tailored to JD skills |
| 🏢 **Company Enrichment** | Auto-fetches company summary, logo, and Wikipedia link |
| 🏷️ **Role Inference** | Determines the most likely role from extracted skill signals |
| 📝 **Dynamic Summary** | Generates a human-readable JD summary using role + skill data |
| 🔐 **Auth** | Secure register/login with bcrypt passwords and JWT (httpOnly cookie) |
| 🗑️ **Delete JD** | Users can delete only their own analyzed JDs |
| 🌓 **Theme Toggle** | Light / Dark mode support |
| 📱 **Responsive UI** | Fully responsive with Tailwind CSS + Framer Motion animations |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Lucide React | Icon library |
| Radix UI | Accessible component primitives |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| JSON Web Tokens | Authentication |
| cookie-parser | HttpOnly cookie support |
| multer | File/PDF upload handling |
| pdfjs-dist | PDF text extraction |
| Wikipedia REST API | Company enrichment (no API key needed) |

---

## Project Structure

```
PlacedPrep/
├── backend/
│   └── src/
│       ├── app.js                  # Express app setup & middleware
│       ├── server.js               # Server entry point
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js  # Register / Login / Logout
│       │   └── jd.controller.js    # Upload, fetch, delete JDs
│       ├── middleware/
│       │   └── auth.middleware.js  # JWT verification middleware
│       ├── models/
│       │   ├── User.model.js       # User schema
│       │   └── JobDescription.model.js # JD schema (skills, roadmap, companyInfo…)
│       ├── nlp/
│       │   ├── index.js            # NLP pipeline orchestrator
│       │   ├── normalize.js        # Text normalization
│       │   ├── skillOntology.js    # Master skill dictionary (100+ skills)
│       │   ├── skillExtractor.js   # Frequency-based skill extraction
│       │   ├── skillCategorizer.js # Groups skills into categories
│       │   ├── roleInferencer.js   # Infers job role from skills
│       │   ├── roleProfiles.js     # Role → skill signal mapping
│       │   ├── roadmapGenerator.js # Phase-ordered learning roadmap
│       │   ├── summaryGenerator.js # Dynamic JD summary text
│       │   └── companyEnricher.js  # Wikipedia API integration
│       ├── routes/
│       │   ├── auth.routes.js      # /api/auth/*
│       │   └── jd.routes.js        # /api/jd/*
│       └── utils/
│           └── extractTextFromFile.js # PDF/image text extraction
│
└── frontend/
    └── src/
        ├── App.jsx                 # Root router
        ├── main.jsx                # React entry point
        ├── pages/
        │   ├── Login.jsx           # Login page
        │   ├── Register.jsx        # Register page
        │   ├── Dashboard.jsx       # JD library dashboard
        │   ├── UploadJD.jsx        # Upload & analyze a new JD
        │   └── JDDetail.jsx        # Detailed JD analysis view
        ├── components/
        │   ├── Navbar.jsx          # Top navigation bar
        │   ├── JDCard.jsx          # JD summary card (dashboard)
        │   ├── Roadmap.jsx         # Roadmap visualization
        │   ├── FileDropzone.jsx    # Drag-and-drop file upload
        │   ├── ProtectedRoute.jsx  # Auth guard wrapper
        │   ├── ThemeToggle.jsx     # Dark/light mode toggle
        │   └── ui/                 # Shared UI primitives (button, card, etc.)
        ├── context/
        │   └── AuthContext.jsx     # Global auth state
        ├── services/
        │   └── api.js              # Axios instance & API calls
        └── data/
            └── learningResources.js # Static skill → resource mapping
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A running **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file (see Environment Variables section)
cp .env.example .env   # or create .env manually

# 4. Start in development mode (with nodemon hot-reload)
npm run dev

# OR start in production mode
npm start
```

The backend API will be live at **`http://localhost:5000`** by default.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the Vite dev server
npm run dev
```

The frontend will be live at **`http://localhost:5173`**.

---

## Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/placedprep

# JWT secret (use a long, random string in production)
JWT_SECRET=your_super_secret_key_here

# Server port (optional, defaults to 5000)
PORT=5000
```

> **Note:** The frontend proxy is already configured in `vite.config.js` to forward `/api` requests to the backend. No frontend `.env` changes are needed for local development.

---

## API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login & receive JWT cookie | ❌ |
| `POST` | `/logout` | Clear auth cookie | ✅ |
| `GET` | `/me` | Get current logged-in user | ✅ |

### Job Description Routes — `/api/jd`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/` | Upload & analyze a new JD (text or file) | ✅ |
| `GET` | `/` | Get all JDs uploaded by the current user | ✅ |
| `GET` | `/:id` | Get a single JD with full analysis | ✅ |
| `DELETE` | `/:id` | Delete a JD (owner only) | ✅ |

**Upload JD Request Body (multipart/form-data or JSON):**
```json
{
  "companyName": "Google",
  "jobTitle": "Software Engineer",
  "text": "We are looking for a skilled engineer proficient in React, Node.js..."
}
```

**Analysis Response Shape:**
```json
{
  "role": "Full Stack Developer",
  "skills": {
    "frontend": [{ "name": "React", "weight": 3 }],
    "backend":  [{ "name": "Node.js", "weight": 2 }]
  },
  "roadmap": [
    { "phase": "Beginner",      "topics": ["HTML", "CSS", "JavaScript"] },
    { "phase": "Intermediate",  "topics": ["React", "Node.js", "REST APIs"] },
    { "phase": "Advanced",      "topics": ["System Design", "Docker"] }
  ],
  "summary": "This Full Stack Developer role at Google emphasizes...",
  "companyInfo": {
    "description": "Google LLC is an American multinational...",
    "thumbnail": "https://...",
    "wikiUrl": "https://en.wikipedia.org/wiki/Google",
    "source": "wikipedia"
  }
}
```

---

## NLP Pipeline

The custom NLP pipeline runs **server-side** and is entirely local (no external AI APIs needed for skill extraction):

```
Raw JD Text
    │
    ▼
1. normalize.js        ─── Lowercases, removes punctuation, collapses whitespace
    │
    ▼
2. skillExtractor.js   ─── Scans normalized text against skillOntology; counts frequency
    │
    ▼
3. skillCategorizer.js ─── Groups skills into categories (Frontend, Backend, DevOps, etc.)
    │
    ▼
4. roleInferencer.js   ─── Matches skill signals to role profiles (roleProfiles.js)
    │
    ▼
5. roadmapGenerator.js ─── Orders phases Beginner→Advanced; sorts topics by weight
    │
    ▼
6. summaryGenerator.js ─── Builds a data-driven human-readable summary string
    │
    ▼
7. companyEnricher.js  ─── Calls Wikipedia REST API for company thumbnail & description
    │
    ▼
Final Analysis Object  ─── Saved to MongoDB & returned to frontend
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Email + password login form |
| `/register` | Register | New account creation |
| `/` | Dashboard | Grid of all your analyzed JDs with search |
| `/upload` | UploadJD | Paste text or drag-and-drop a PDF/image |
| `/jd/:id` | JDDetail | Full analysis: skills, roadmap, company info, summary |

All routes except `/login` and `/register` are **protected** and require a valid JWT session.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">
  Built with ❤️ to help students crack their dream placements.
</div>
