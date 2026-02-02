const express = require('express');
const creatureRoutes = require('./routes/creatureRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

/*
  Simple health-check route so I can confirm the server is running.
  You can hit http://localhost:5000/ in the browser to see this.
*/
app.get('/', (req, res) => {
  res.json({ message: 'Shadehaven Lore API is running' });
});

/*
  Creature routes
  All creature-related endpoints will start with /api/creatures
*/
app.use('/api/creatures', creatureRoutes);

module.exports = app;
