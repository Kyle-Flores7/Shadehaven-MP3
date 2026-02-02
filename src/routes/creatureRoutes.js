const express = require('express');
const {
  getAllCreatures,
  getCreatureById,
  createCreature,
  updateCreature,
  deleteCreature,
} = require('../controllers/creatureController');

const router = express.Router();

/*
  Routes for Creature resources.
  These map HTTP methods and URLs to controller functions.
*/

// GET all creatures
router.get('/', getAllCreatures);

// GET a single creature by id
router.get('/:id', getCreatureById);

// CREATE a new creature
router.post('/', createCreature);

// UPDATE an existing creature
router.put('/:id', updateCreature);

// DELETE a creature
router.delete('/:id', deleteCreature);

module.exports = router;
