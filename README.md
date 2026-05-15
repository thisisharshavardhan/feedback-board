# Feedback Board

A Canny-style feedback board where users can submit ideas, upvote them, and filter by status. Built with a glassmorphism + aurora UI theme.

**Live:** [https://18.61.174.175.nip.io](https://18.61.174.175.nip.io)

---

## Features

- Submit feedback with a title and description
- Upvote / un-vote (anonymous, tracked per browser)
- Filter by status and sort by newest or top voted
- Admin mode to update statuses and delete items
- CI/CD — every push to `main` typechecks, builds, and deploys automatically

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | Express + TypeScript |
| Database | SQLite via `node:sqlite` (built-in Node 22) |
| Deploy | EC2 + Nginx + PM2 + Let's Encrypt |
| CI/CD | GitHub Actions |

---

## Local development

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp server/.env.example server/.env

# Start both client and server
npm run dev
```

Client runs at `http://localhost:5173`, server at `http://localhost:3001`.

---

## Admin mode

Click **User** in the top-right corner and select **Admin** to enter demo admin mode. This lets you change feedback statuses and delete items — no real authentication, for demo only.

In production, set a strong `ADMIN_SECRET` in `server/.env`.

---

## Project structure

```
feedback-board/
├── client/        # React frontend (Vite)
├── server/        # Express backend
└── .github/       # CI/CD workflows
```

---

## Deployment

Pushes to `main` trigger GitHub Actions:

1. Typecheck and build both workspaces
2. SSH into EC2, pull latest, rebuild, restart PM2

Secrets required in GitHub: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`.
