# 🚀 Coolify Hackathon Demo

A complete full-stack application demonstrating deployment on Coolify, featuring a React frontend and Express.js backend.

## 📁 Project Structure

```
coolify-hackathon-demo/
├── frontend/              # Vite + React application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .gitignore`
├── backend/              # Express.js API
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI
├── README.md
└── .gitignore
```

## 🎯 Features

- **Frontend**: Vite + React with modern UI
- **Backend**: Express.js REST API with CORS enabled
- **CI/CD**: GitHub Actions workflow for automated builds
- **Docker**: Production-ready Dockerfiles for both services
- **Coolify Ready**: Optimized for Coolify deployment

## 🛠️ Local Development

### Prerequisites

- Node.js 20 or higher
- npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend server will start on `http://localhost:3000`

**Available endpoints:**
- `GET /api/hello` - Returns a greeting message
- `GET /health` - Health check endpoint

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start on `http://localhost:5173`

The frontend will automatically proxy `/api` requests to the backend at `http://localhost:3000` during development.

## 🐳 Production Build

### Build Backend Docker Image

```bash
cd backend
docker build -t coolify-backend .
docker run -p 3000:3000 coolify-backend
```

### Build Frontend Docker Image

```bash
cd frontend
docker build -t coolify-frontend .
docker run -p 80:80 coolify-frontend
```

## 🚢 Coolify Deployment Guide

### Overview

This project consists of two separate applications that need to be deployed on Coolify:
1. **Backend API** (Express.js)
2. **Frontend** (React/Vite)

### Step 1: Create Backend Application

1. In Coolify, click **+ New Resource** → **Application**
2. Select your Git repository and choose the `main` branch
3. Configure the backend:
   - **Name**: `coolify-hackathon-backend`
   - **Build Pack**: Docker
   - **Dockerfile Location**: `backend/Dockerfile`
   - **Base Directory**: `backend`
   - **Port**: `3000`
4. Add environment variables (if needed):
   - `PORT=3000`
5. Click **Save** and **Deploy**
6. Note the backend URL (e.g., `https://backend.yourdomain.com`)

### Step 2: Create Frontend Application

1. In Coolify, click **+ New Resource** → **Application**
2. Select your Git repository and choose the `main` branch
3. Configure the frontend:
   - **Name**: `coolify-hackathon-frontend`
   - **Build Pack**: Docker
   - **Dockerfile Location**: `frontend/Dockerfile`
   - **Base Directory**: `frontend`
   - **Port**: `80`
4. Click **Save** and **Deploy**

### Step 3: Connect Frontend to Backend

The frontend is configured to call the backend using the relative path `/api/hello`. This works because:

1. The `nginx.conf` file in the frontend includes a proxy configuration
2. You need to update the nginx.conf to point to your actual backend URL in Coolify

**Option A: Update nginx.conf before deployment**

Edit `frontend/nginx.conf` and change:
```nginx
location /api {
    proxy_pass http://your-backend-url.coolify.io;
    ...
}
```

**Option B: Use Coolify's internal networking**

If both services are in the same Coolify project, you can use the internal service name:
```nginx
location /api {
    proxy_pass http://coolify-hackathon-backend:3000;
    ...
}
```

### Step 4: Verify Deployment

1. Visit your frontend URL
2. You should see: "✅ Connected to backend" with the message "Hello from backend!"
3. If you see "Backend not reachable", check:
   - Backend is running and accessible
   - nginx.conf proxy configuration is correct
   - CORS is enabled on backend (already configured)

## 🔄 CI/CD Workflow

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs on every push to `main` branch
- Installs dependencies for both frontend and backend
- Builds the frontend application
- Verifies all files are present

The workflow does NOT automatically deploy. Coolify will handle deployments when you push to the connected branch.

## 📝 Environment Variables

### Backend

- `PORT` - Server port (default: 3000)

### Frontend

No environment variables required. API endpoint is configured in `vite.config.js` for local development and `nginx.conf` for production.

## 🧪 Testing Locally with Docker Compose

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - PORT=3000

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Then run:
```bash
docker-compose up --build
```

Visit `http://localhost` to see the application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 🎉 Hackathon Notes

This project was created for the Coolify hackathon to demonstrate:
- Full-stack application deployment
- Docker containerization
- CI/CD integration
- Production-ready configuration

Deploy this to Coolify and you're ready to go! 🚀
# coolify-hackathon-demo
