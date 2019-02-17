const express = require('express');
const router = require('./router.js');
// const models = require('./models');

const app = express();

// Check port and debug mode values.
const flags = {
  DEBUG: (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'dev'),
  PORT: (process.env.PORT || process.env.NODE_PORT || 3001),
  MONGODB_URI: (process.env.MONGODB_URI || 'mongodb://localhost/moodswing'),
  ERRORS: {
      noRootQuery: "E001",
      missingMood: "E002",
      missingUser: "E003",
      moodAlreadyExists: "E004",
      userAlreadyExists: "E005",
  },
  API_METADATA: {
      application: "MS",
      version: (process.env.API_VERSION || 1),
  },
};

// Set up routes.
router(app, flags);

// Return info back to console.
app.listen(flags.PORT, (err) => {
    if(err) { throw err; }
    if(flags.DEBUG) { console.log(`API server on port "${flags.PORT}".`); }
});



/*
app.use('/time', (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
*/
