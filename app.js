
const express = require('express');
const bodyParser = require('body-parser');

const stepOMeterRoutes = require('./routes/step-o-meter');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(stepOMeterRoutes);

app.listen(3000);