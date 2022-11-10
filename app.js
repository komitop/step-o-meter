
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const stepOMeterRoutes = require('./routes/step-o-meter');
const sequelize = require('./utils/database');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log('req.user.name');
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use(stepOMeterRoutes);

sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                email: 'komitop.d@gmail.com',
                name: 'Danae'
            });
        }

        return user;
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => console.log(err));