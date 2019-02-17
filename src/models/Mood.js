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
  mood: {
    type: Number,
    required: true,
    unique: false,
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
