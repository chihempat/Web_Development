const mongoose = require('mongoose');

console.log(process.env.PORT)
const url = "mongodb+srv://chintan:helloworld@cluster0.8dtoh.mongodb.net/storybooks?retryWrites=true&w=majority"
const connectDB = mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then((con) => console.log("Mongo DB connect:" + con.connection.host))
    .catch(err => {
        console.error(err);
        process.exit(1)
    })


module.exports = connectDB;