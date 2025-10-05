require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/products', productsRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend on http://localhost:${port}`));
