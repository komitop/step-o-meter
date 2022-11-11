const StepReport = require('../models/stepReport');
const { Op } = require('sequelize');

exports.getAddStep = (req, res, next) => {
    res.render('add-step', {
        showSuccessMsg: false,
        errorMsg: null,
        path: '/steps/add'
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
                    errorMsg: 'A value for this date has already been set.',
                    path: '/steps/add'
                });
            } else {
                req.user.createStepReport({
                    steps: steps,
                    occuredAt: occuredAt
                })
                    .then(result => {
                        res.render('add-step', {
                            showSuccessMsg: true,
                            errorMsg: null,
                            path: '/steps/add'
                        });
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};

exports.getStepsHistory = (req, res, next) => {
    res.render('steps-history', {
        stepReports: 0,
        path: '/steps-history'
    });
};

exports.postStepsHistory = (req, res, next) => {
    if (req.body.datefilter) {
        const dates = req.body.datefilter.split(' - ');
        if (dates && dates.length == 2) {
            const fromDateAsStrings = dates[0].split('/');

            if (fromDateAsStrings && fromDateAsStrings.length == 3) {
                let fromDate = new Date(parseInt(fromDateAsStrings[2]),
                    parseInt(fromDateAsStrings[1])-1, parseInt(fromDateAsStrings[0]));

                const toDateAsStrings = dates[1].split('/');

                if (toDateAsStrings && toDateAsStrings.length == 3) {
                    let toDate = new Date(parseInt(toDateAsStrings[2]),
                        parseInt(toDateAsStrings[1])-1, parseInt(toDateAsStrings[0]));


                    StepReport.findAll({
                        where: {
                            userId: req.user.id,
                            occuredAt: {
                                [Op.gte]: fromDate,
                                [Op.lte]: toDate,
                            }
                        }
                    })
                        .then(results => {
                            res.render('steps-history', {
                                stepReports: results,
                                path: '/steps-history'
                            });
                        })
                        .catch(err => console.log(err));
                }
            }


        }
    }
};