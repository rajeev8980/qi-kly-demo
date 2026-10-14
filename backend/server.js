const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory demo data (backend side)
const designs = [
  { id: 1, name: 'QiKly Default', theme: 'dark', primary: '#6366f1' },
  { id: 2, name: 'QiKly Light', theme: 'light', primary: '#4f46e5' },
  { id: 3, name: 'QiKly Sunset', theme: 'dark', primary: '#ec4899' }
];
let messages = [];

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'qikly-backend', time: new Date().toISOString() }));
app.get('/api/designs', (_req, res) => res.json(designs));
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message required' });
  const entry = { id: messages.length + 1, name, email, message, at: new Date().toISOString() };
  messages.push(entry);
  res.status(201).json({ ok: true, entry });
});
app.get('/api/messages', (_req, res) => res.json(messages));

// Serve frontend
const frontend = path.join(__dirname, '..');
app.use(express.static(frontend));
app.get('*', (_req, res) => res.sendFile(path.join(frontend, 'index.html')));

app.listen(PORT, () => console.log(`QiKly backend running on port ${PORT}`));
