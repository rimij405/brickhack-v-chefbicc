const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');
// const models = require('./models');

const app = express();

// Check port and debug mode values.
const flags = {
  DEBUG: (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'dev'),
  PORT: (process.env.PORT || process.env.NODE_PORT || 3001),
  MONGODB_URI: (process.env.MONGODB_URI || 'mongodb://localhost/test'),
  ERRORS: {

    unknownError: 'E000',
    noRootQuery: 'E001',

    missing: {
      mood: 'E101',
      user: 'E102',
      username: 'E103',
      firstName: 'E104',
      lastName: 'E105',
      password: 'E106',
      moodID: 'E107',
      email: 'E108',
      userID: 'E109',
    },

    alreadyExists: {
      mood: 'E201',
      user: 'E202',
    },

    incorrect: {
      username: 'E301',
      password: 'E302',
    }

  },
  API_METADATA: {
    application: 'MS',
    version: (process.env.API_VERSION || 1),
  },
};

// Connect to the database.
mongoose.connect(
  flags.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Set up cors.
app.use(cors());

// Set up the body parser to support URL encoded and JSON payloads.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes.
router(app, flags);

// Return info back to console.
app.listen(flags.PORT, (err) => {
  if (err) { throw err; }
  if (flags.DEBUG) { console.log(`API server on port "${flags.PORT}".`); }
});


/*
app.use('/time', (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
*/
