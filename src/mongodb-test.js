const express = require('express');

const app = express();


// Check port and debug mode values.
const environment = process.env.NODE_ENV.trim() || 'dev';

const flags = {
  DEBUG: (environment === 'dev'),
  PORT: (process.env.PORT || 3001),
};


const mongoose = require('mongoose');

// In dev mode, connect to the test DB
if (flags.DEBUG) {
  const db = mongoose.connect('mongodb://localhost/test');
} else {
  // Undefined!
  // const db = mongoose.connect('mongodb://localhost/OFFICIALDB
}

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  moodIDs: [{ id: Number }],
});



// TODO determine representation each of these- what is a "mood"?
const moodSchema = new mongoose.Schema({
  uuid: Number,
  date: String,
  mood: Number
});


const User = mongoose.model('User', userSchema);
const Mood = mongoose.model('Mood', moodSchema);


app.get('/', (req, res) => {
  let resBody = 'Hello mongodb!';
  if (flags.DEBUG) {
    resBody += ' Debug mode.';
  }
  res.send(resBody);
});

app.get('/users/:userId', (req, res) => {
  res.send(req.params);
});

app.get('/mkuser/:firstName', (req, res) => {
  const newUser = new User({
    firstName: req.params.firstName,
    lastName: 'default',
    email: 'default',
    moodIDs: [],
  });
  res.send(newUser);
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
