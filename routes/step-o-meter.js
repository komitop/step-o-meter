const express = require('express');
const { check } = require('express-validator/check');

const stepReportController = require('../controllers/stepReport');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        name: req.user.name
    });
});

router.get('/steps/add', stepReportController.getAddStep);
router.post('/steps/add',
    [
        check('steps').isInt({ min: 1, max: 50000 }).withMessage('Steps field should be a number whithin 1 and 50,000'),
        check('occuredAt').isDate().withMessage('Date field should be a valid date')
            .custom((value, { req }) => {
                if (new Date(value) > new Date()) {
                    throw new Error('The date field cannot contain a future date');
                }

                return true;
            })
            .custom((value, { req }) => {
                return req.user.getStepReports({ where: { occuredAt: req.body.occuredAt } })
                    .then(results => {
                        if (results && results.length > 0) {
                            return Promise.reject('A value for this date has already been set.');
                        }
                    });
            })
    ],
    stepReportController.postAddStep
);

router.get('/steps-history', stepReportController.getStepsHistory);
router.post('/steps-history', stepReportController.postStepsHistory);

router.get('/weather-data', stepReportController.getWeatherData);

module.exports = router;