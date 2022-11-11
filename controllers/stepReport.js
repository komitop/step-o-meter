const StepReport = require('../models/stepReport');

exports.getAddStep = (req, res, next) => {
    res.render('add-step', {
        showSuccessMsg: false,
        errorMsg: null
    });
};

exports.postAddStep = (req, res, next) => {
    const steps = req.body.steps;
    const occuredAt = new Date(req.body.occuredAt);

    req.user.getStepReports({ where: { occuredAt: occuredAt } })
        .then(results => {
            if (results && results.length > 0) {
                res.render('add-step', {
                    showSuccessMsg: false,
                    errorMsg: 'A value for this date has already been set.'
                });
            } else {
                req.user.createStepReport({
                    steps: steps,
                    occuredAt: occuredAt
                })
                .then(result => {
                    res.render('add-step', {
                        showSuccessMsg: true,
                        errorMsg: null
                    });
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};