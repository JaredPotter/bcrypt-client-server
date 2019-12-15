const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const port = 3010;
const saltRounds = 10;

const app = express();
app.use(cors());

app.post('/register', (req, res) => {
    res.send();
});

app.post('/login', (req, res) => {
    res.send('Yay!');
});

app.listen(port, () => {
    console.log('Server Started on ' + port);
});