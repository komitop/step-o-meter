
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const stepOMeterRoutes = require('./routes/step-o-meter');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(stepOMeterRoutes);

app.listen(3000);