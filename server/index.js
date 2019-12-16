const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcrypt');

const port = 3010;
const saltRounds = 10;

const app = express();
app.use(bodyParser.json())
app.use(cors());

const users = {
    "testUser": {
        "passwordHash": "asdasd"
    }
};

app.post('/register', (req, res) => {
    const body = req.body;

    if(!body || !body.username || !body.password) {
        res.status(400).send('Missing username and/or password.');
        return;
    }
    
    const username = body.username;
    const password = body.password;

    // Check if user already exists.
    if(users[username]) {
        res.status(400).send('Username already exists.');
        return;
    }
    
    bcrypt.hash(password, saltRounds, (error, hash) => {
        if(error) {
            res.status(500).send('Password Hash Failed.');
            return;
        }

        // store in database.
        const newUser = {
            hashedPassword: hash,
            username: username
        };

        users[username] = newUser;

        res.status(201).send('CREATED')
    });
});

app.post('/login', (req, res) => {
    const body = req.body;

    if(!body || !body.username || !body.password) {
        res.status(400).send('Missing username and/or password.');
        return;
    }
    
    const username = body.username;
    const password = body.password;
    const user = users[username];

    if(user) {
        const hashedPassword = user.hashedPassword;

        bcrypt.compare(password, hashedPassword, (error, result) => {
            if(result) {
                res.status(200).send('Successfully logged in.');
            }
            else {
                res.status(400).send('Incorrect username/password.');
            }
        });
    }
    else {
        res.status(400).send('Incorrect username/password.');
    }
});

app.listen(port, () => {
    
    console.log('Server Started on ' + port);
});