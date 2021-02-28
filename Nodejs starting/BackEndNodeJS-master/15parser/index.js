const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));