const axios = require('axios');
const Creature = require('../models/Creature');

const BASE_URL = 'https://www.dnd5eapi.co';

//Fetch a list of monster details from the external D&D 5e API.//
async function fetchMonsters(limit = 20) {
  // Get the list of monsters
  const listResponse = await axios.get(`${BASE_URL}/api/monsters`);
  const results = listResponse.data.results.slice(0, limit);

  // Fetch details for each monster
  const detailPromises = results.map((monster) =>
    axios.get(`${BASE_URL}${monster.url}`)
  );

  const detailResponses = await Promise.all(detailPromises);
  return detailResponses.map((res) => res.data);
}

// Seed the database with monsters from the external API if the creatures collection is currently empty./
async function seedDatabaseIfEmpty() {
  const count = await Creature.countDocuments();
  // If data already exists no need to reseed every time//
  if (count > 0) {
    console.log(`Creatures already in database (${count}), skipping seed.`);
    return;
  }

  console.log('No creatures found in database, seeding from external API...');

  const monsters = await fetchMonsters(20);

  const docs = monsters.map((mon) => ({
    apiIndex: mon.index,
    name: mon.name,
    type: mon.type,
    size: mon.size,
    alignment: mon.alignment,
    armor_class: Array.isArray(mon.armor_class)
      ? mon.armor_class[0].value
      : mon.armor_class,
    hit_points: mon.hit_points,
    challenge_rating: mon.challenge_rating,
  }));

  await Creature.insertMany(docs);

  console.log(`Seeded ${docs.length} creatures from external API.`);
}

module.exports = {
  fetchMonsters,
  seedDatabaseIfEmpty,
};
