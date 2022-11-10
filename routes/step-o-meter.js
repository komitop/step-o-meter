const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Step-o-Meter'
    });
});

module.exports = router;