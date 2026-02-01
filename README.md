# 📧 ReachInbox – Full-Stack Email Scheduler

A production-grade email scheduling system inspired by ReachInbox’s internal infrastructure 
This project demonstrates reliable delayed email delivery, persistence across restarts, rate limiting, worker concurrency, and a clean React dashboard with Google OAuth authentication.

---

## 🚀 Features

### Backend
- Schedule emails for a **future date & time**
- **BullMQ + Redis** based delayed job scheduling (no cron jobs)
- Jobs **persist across server restarts**
- **Worker concurrency** support
- **Hourly rate limiting** using Redis-backed counters
- Emails stored in DB before queueing (idempotency safe)
- Email sending via **Ethereal SMTP**
- **Google OAuth token verification**

### Frontend
- **Google OAuth Login**
- Dashboard with:
  - Scheduled Emails
  - Sent Emails
- CSV upload for email recipients
- Compose Email modal
- Loading states & error handling
- UI aligned with provided **Figma design**

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- BullMQ
- Redis (v5+)
- PostgreSQL / MySQL
- Nodemailer + Ethereal Email

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Google OAuth (`@react-oauth/google`)

---

## 📂 Project Structure

```
reachinbox-assignment/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── queues/
│   │   ├── workers/
│   │   └── index.ts
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.tsx
│   ├── .env
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
- Node.js (v18+ recommended)
- Redis **v5 or higher**
- PostgreSQL or MySQL

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### `.env` (backend)
```env
PORT=4000
DATABASE_URL=your_database_url
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

ETHEREAL_USER=your_ethereal_user
ETHEREAL_PASS=your_ethereal_pass
```

### Start Backend
```bash
npm run dev
```

Health check:
```
http://localhost:4000/health
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

### `.env` (frontend)
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Start Frontend
```bash
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔐 Google OAuth Setup

1. Go to **Google Cloud Console**
2. Create a project
3. Enable **Google Identity Services**
4. Create OAuth Client (Web)
5. Add:
   - Authorized Origin: `http://localhost:5173`
6. Copy **Client ID** into frontend `.env`

---

## 🧪 Email Testing (Ethereal)

- Emails are sent via **Ethereal SMTP**
- No real emails are delivered
- Preview URLs appear in backend logs after sending

---

## 🧠 Architecture Notes

- Emails are first stored in the database
- Each email becomes a **BullMQ delayed job**
- Redis ensures persistence and prevents duplication
- Workers handle concurrency safely
- Rate limiting is enforced using Redis counters
- No cron jobs are used

---

## 📈 Behavior Under Load

- Supports 1000+ scheduled emails
- Jobs exceeding hourly limits are delayed to the next available window
- Worker concurrency is configurable

---

## ✅ Assignment Requirements Covered

- ✔ Persistent scheduling
- ✔ No cron jobs
- ✔ BullMQ + Redis
- ✔ Google OAuth login
- ✔ Frontend dashboard
- ✔ Rate limiting & concurrency
- ✔ Safe restart handling

---

## 🎥 Demo Video

Included in submission (≤ 5 minutes):
- Email scheduling
- Dashboard view
- Restart behavior
- Rate limiting explanation

---

## 📝 Notes

- Redis **must be v5+** for BullMQ compatibility
- App is in Google OAuth **testing mode**
- Some production features (multi-tenant auth, real SMTP) are intentionally simplified

---

## 👤 Author

**Priya**  
Assignment submission for **ReachInbox**
