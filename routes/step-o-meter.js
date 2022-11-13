const express = require('express');

const stepReportController = require('../controllers/stepReport');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        name: req.user.name
    });
});

router.get('/steps/add', stepReportController.getAddStep);
router.post('/steps/add', stepReportController.postAddStep);

router.get('/steps-history', stepReportController.getStepsHistory);
router.post('/steps-history', stepReportController.postStepsHistory);

router.get('/weather-data', stepReportController.getWeatherData);

module.exports = router;