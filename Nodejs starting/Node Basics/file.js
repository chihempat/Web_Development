const fs = require('fs');
const { write, fdatasync } = require('fs/promises');
const path = require('path');


// fs.appendFile(path.join(__dirname, '/test', 'hello3.txt'), "hello", err => {
//     if (err) throw err;
//     console.log("File written  created ...");
// });

// fs.readFile(path.join(__dirname, "/test", "hello3.txt"), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })


fs.rename(path.join(__dirname, "/test", "hello3.txt"), path.join(__dirname, "/test", "he.txt"), (err, data) => {
    if (err) throw err;
    console.log("file renamedß");
});