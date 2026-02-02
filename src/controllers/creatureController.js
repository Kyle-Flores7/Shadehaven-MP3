const Creature = require('../models/Creature');

/*
  Controller functions for Creature routes.
  These handle the CRUD operations and talk to MongoDB.
*/

// GET /api/creatures
// Optional: support simple query filtering later if needed
async function getAllCreatures(req, res) {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (error) {
    console.error('Error fetching creatures:', error.message);
    res.status(500).json({ error: 'Failed to fetch creatures' });
  }
}

// GET /api/creatures/:id
async function getCreatureById(req, res) {
  const { id } = req.params;

  try {
    const creature = await Creature.findById(id);

    if (!creature) {
      return res.status(404).json({ error: 'Creature not found' });
    }

    res.json(creature);
  } catch (error) {
    console.error('Error fetching creature by id:', error.message);
    res.status(400).json({ error: 'Invalid creature id' });
  }
}

// POST /api/creatures
// Create a new creature (could be Shadehaven-only or custom)
async function createCreature(req, res) {
  try {
    const data = req.body;

    const newCreature = await Creature.create(data);

    console.log('Created new creature:', newCreature._id);

    res.status(201).json(newCreature);
  } catch (error) {
    console.error('Error creating creature:', error.message);
    res.status(400).json({ error: 'Failed to create creature' });
  }
}

// PUT /api/creatures/:id
// Full update of an existing creature
async function updateCreature(req, res) {
  const { id } = req.params;

  try {
    const updated = await Creature.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Creature not found' });
    }

    console.log('Updated creature:', updated._id);

    res.json(updated);
  } catch (error) {
    console.error('Error updating creature:', error.message);
    res.status(400).json({ error: 'Failed to update creature' });
  }
}

// DELETE /api/creatures/:id
async function deleteCreature(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Creature.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Creature not found' });
    }

    console.log('Deleted creature:', deleted._id);

    res.json({ message: 'Creature deleted successfully' });
  } catch (error) {
    console.error('Error deleting creature:', error.message);
    res.status(400).json({ error: 'Failed to delete creature' });
  }
}

module.exports = {
  getAllCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
};
