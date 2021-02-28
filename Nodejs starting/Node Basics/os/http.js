const http = require("http")
http.createServer((req, res) => {
    res.write("hello ");
    // res.status(201).json({
    //     "message": "hello"
    // });
    res.end();
}).listen(5000);