const mongoose = require('mongoose');

/*
  Creature schema
  This model stores creatures pulled from an external API (D&D 5e)
  and allows us to add Shadehaven-specific lore fields later.
*/
const creatureSchema = new mongoose.Schema(
  {
    // Unique index coming from the external API
    apiIndex: {
      type: String,
      required: true,
      unique: true,
    },

    // Basic creature info from API
    name: {
      type: String,
      required: true,
    },
    type: String,
    size: String,
    alignment: String,

    // Combat-related stats
    armor_class: Number,
    hit_points: Number,
    challenge_rating: Number,

    // Shadehaven custom fields
    shadehavenName: String,
    realm: String,
    threatLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Cataclysmic'],
      default: 'Low',
    },
    isCanon: {
      type: Boolean,
      default: false,
    },
    notes: String,
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model('Creature', creatureSchema);
