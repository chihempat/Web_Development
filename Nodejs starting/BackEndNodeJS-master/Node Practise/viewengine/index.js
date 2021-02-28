const express = require('express');
const path = require('path');

const app = express();

var port = process.env.PORT || 4000;

//middleware

app.set("views", path.join(__dirname, "views"))
app.set("viewengine", "pug");

app.get('/', (req, res) => {
    res.render('index.pug')
});


app.listen(port, () => {
    console.log("Listening at 4000")
})