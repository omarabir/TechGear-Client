# Next.js Product App

Simple product listing app with public pages and protected Add/Manage pages.

## Features
- Landing + hero + sections
- Products list, details
- Login (Google via NextAuth)
- Protected pages: Add Product, Manage Products
- Express backend (in-memory) for products API

## Setup
### Backend
cd backend
npm install
node server.js
API runs at http://localhost:4000

### Frontend
cd frontend
npm install
# add env vars as described (.env.local)
npm run dev
Runs Next.js at http://localhost:3000

## Routes
- `/` Landing
- `/login` Login & social auth
- `/products` Item list
- `/products/[id]` Product details
- `/add-product` Protected — add product
- `/manage-products` Protected — manage (view/delete)

## Deployment
- Deploy backend to Heroku/Vercel (serverless may need adaptation) or as Express on Railway.
- Deploy frontend to Vercel. set environment variables in Vercel panel.
