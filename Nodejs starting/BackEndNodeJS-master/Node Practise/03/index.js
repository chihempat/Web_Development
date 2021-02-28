const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/about", (req, res) => {
    res.status(500).jsons({ msg: "Hello World" });
});

app.get("/ab*cd", (req, res) => {
    res.send("<h1>I am Regex form</h1>")
})
app.delete("/delete", (req, res) => {
    res.send("congo you hace deleted this thing")
})
app.get("/user/:id/status/:status_id", (req, res) => {
    res.send(req.params)
});

app.get("/flights/:from-:to", (req, res) => {
    res.status(200).json({
        "from": req.params.from,
        "to": req.params.to
    });
});


//create route for contact us and services
//create a delete route and test it using postman

app.listen(3000, () => console.log("Server is running at port 3000...."));