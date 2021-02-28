const url = require('url');

const myUrl = new URL("https://www.youtube.com/watch?v=fBNz5xF-Kx4&t=2109s");

console.log(myUrl.host);
console.log(myUrl.password);
console.log(myUrl.searchParams);

myUrl.sea