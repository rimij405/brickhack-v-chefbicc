const express = require('express');

const app = express();

// Check port and debug mode values.
const flags = {
  DEBUG: (process.env.NODE_ENV.trim() === 'dev'),
  PORT: (process.env.PORT || 3001),
};

app.get('/', (req, res) => {
  let resBody = 'Hello world!';
  if (flags.DEBUG) {
    resBody += ' Debug mode.';
  }
  res.send(resBody);
});

app.get('/users/:userId', (req, res) => {
  res.send(req.params);
});

app.use('/time', (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.listen(flags.PORT, () => console.log(`Server listening on port ${flags.PORT}!`));
