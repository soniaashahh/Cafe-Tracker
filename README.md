Cafe Spots is a full-stack web application that allows users to track and rate their favorite matcha and coffee shops. Users can create an account, log in with Google or email authentication, and manage their personal list of cafés.

The app allows users to add cafés, store their location and signature drink, give ratings, and edit or delete entries.

## Live Deployment

Try the app here:

https://cafe-tracker-ysnq.vercel.app

## ⚙️ Tech Stack

Frontend
- React (Vite)
- Tailwind CSS
- React Router

Backend
- Node.js
- Express

Database
- MongoDB (MongoDB Atlas)

Authentication
- JWT Authentication
- Google OAuth

Deployment
- Vercel (Frontend)
- Render (Backend)

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/soniaashahh/Cafe-Tracker.git
cd Cafe-Tracker
```

### 2. Install Dependencies

Install dependencies for both the backend and frontend.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Create Environment Variables

Create a `.env` file inside both the **backend** and **frontend** folders.

Backend `.env`

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

### 5. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```
