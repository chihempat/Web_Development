const port = process.env.PORT || 3000;

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

const app = express();


//bring all routes
const auth = require('./routes/api/auth');
const question = require('./routes/api/questions');
const profile = require('./routes/api/profile');




//middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//mongodb configuration
const db = require('./setup/myurl').mongoURL

//attempt to connect ot DB
mongoose.
connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected'))
    .catch((err) => console.log(err))

//passportmiddleware
app.use(passport.initialize());

//config for JWT strategy
require('./strategies/jsonwtStrategy')(passport);

//just for testing
app.get('/', (req, res) => {
    res.send("Hello")
});


//actual routes
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/questions', question);

app.listen(port, () => {
    console.log("Appp running at 3000")
});