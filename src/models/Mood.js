/*
    Mood.js
    Mongoose model for a Mood.
*/

// Require statements.
const mongoose = require('mongoose');

// Set promise.
mongoose.Promise = global.Promise;

// Create the model schema.
const MoodSchema = new mongoose.Schema({

  /* uuid: {
    type: Number,
    required: true,
    unique: true
  }, */
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  mood: {
    type: Number,
    required: true,
    unique: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Helper methods.

// ......

// Create the model.
const MoodModel = mongoose.model('Mood', MoodSchema);

// Export the model.
module.exports.MoodModel = MoodModel;
module.exports.MoodSchema = MoodSchema;
