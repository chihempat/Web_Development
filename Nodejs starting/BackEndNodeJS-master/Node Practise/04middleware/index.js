const express = require('express');
const app = express();

var myconsolelog = function(req, res, next) {
    console.log('I am a miiddleware');
    next();
}

var servertime = function(req, res, next) {
        req.requestTime = Date.now();
        console.log(req.requestTime)
        next();
    }
    //using middleware
app.use(myconsolelog);
app.use(servertime)

app.get('/', servertime, (req, res, next) => {
    res.send("hello" + "time is :" + req.requestTime)
    console.log('helloworld')
})


app.listen(5000, () => console.log('listening at localhost 3000'))