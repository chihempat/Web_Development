const express = require('express');
const bodyparser = require('body-parser');

let app = express();

//middleware
app.use(bodyparser.urlencoded({ extended: false }));

//fro using static files
app.use('/login', express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.send('hello, my application');
})

app.post('/login', (req, res) => {
    console.log(req.body);
    //do somedata processing
    res.redirect('/');
})

app.listen(5000, () => console.log("server is running at port 3000"));