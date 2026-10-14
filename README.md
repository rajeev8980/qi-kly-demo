# QiKly — Design System Demo

Frontend + Backend full-stack demo.

## Frontend
Static site: `index.html`, `styles.css`, `app.js`. Open directly in browser.

## Backend (Node/Express)
```bash
cd backend
npm install
npm start
# http://localhost:3000
```
API: `/api/health`, `/api/designs`, `/api/contact` (POST), `/api/messages`.

## Live (GitHub Pages)
Frontend published via GitHub Pages: https://rajeev8980.github.io/qi-kly-demo/

## Deploy backend (Render, one click)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/rajeev8980/qi-kly-demo)

The `render.yaml` blueprint deploys the Node backend with `/api/health` check. Then point frontend calls to your Render URL.
