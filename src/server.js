const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');    
});

app.get('/users/:userId', (req, res) => {
    res.send(req.params);
});

app.use('/time', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.listen(8080, () => console.log("Server listening on port 8080!"));