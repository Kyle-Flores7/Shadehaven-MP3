const express = require('express');
const creatureRoutes = require('./routes/creatureRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'Shadehaven Lore API is running' });
});

// Creature routes
app.use('/api/creatures', creatureRoutes);

module.exports = app;
