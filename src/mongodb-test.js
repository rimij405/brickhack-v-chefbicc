const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');

// Create the application.
const app = express();

// Check port and debug mode values.
const environment = process.env.NODE_ENV.trim() || 'dev';

// Set flags.
const flags = {
  DEBUG: (environment === 'dev'),
  PORT: (process.env.PORT || 3001),
};

// Declare database connection.
let db;

// In dev mode, connect to the test DB
if (flags.DEBUG) {
  db = mongoose.connect('mongodb://localhost/test');
} else {
  // db = mongoose.connect('mongodb://localhost/production
}


// Grab the models.
const Models = models(flags);
const User = Models.User.UserModel;
const Mood = Models.Mood.MoodModel; // mongoose.model('Mood', moodSchema);

app.get('/', (req, res) => {
  let resBody = 'Hello mongodb!';
  if (flags.DEBUG) {
    resBody += ' Debug mode.';
  }
  res.send(resBody);
});

app.get('/mkuser/:username/:firstName/:lastName', (req, res) => {
  const userParams = {
    username: req.params.username,
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    salt: 'default',
    password: 'default',
  };
  const newUser = new User(userParams);
  newUser.save();
  console.log('User created');
});

app.get('/getuser/:firstName', (req, res) => {
  const userResult = User.find(req.params);
  res.send('Under construction');
});

app.use('/time', (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.listen(flags.PORT, () => console.log(`Server listening on port ${flags.PORT}!`));
