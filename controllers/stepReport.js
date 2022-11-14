const { Op } = require('sequelize');
const axios = require('axios');
const { validationResult } = require('express-validator/check');

const StepReport = require('../models/stepReport');

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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).render('add-step', {
            showSuccessMsg: false,
            errorMsg: errors.array()[0].msg,
            path: '/steps/add'
        });
    } else {
        req.user.createStepReport({
            steps: steps,
            occuredAt: occuredAt
        }).then(result => {
            res.render('add-step', {
                showSuccessMsg: true,
                errorMsg: null,
                path: '/steps/add'
            });
        }).catch(err => console.log(err));
    }
};

exports.getStepsHistory = (req, res, next) => {
    res.render('steps-history', {
        datesOfSteps: null,
        steps: null,
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
                    parseInt(fromDateAsStrings[1]) - 1, parseInt(fromDateAsStrings[0]));

                const toDateAsStrings = dates[1].split('/');

                if (toDateAsStrings && toDateAsStrings.length == 3) {
                    let toDate = new Date(parseInt(toDateAsStrings[2]),
                        parseInt(toDateAsStrings[1]) - 1, parseInt(toDateAsStrings[0]));


                    StepReport.findAll({
                        where: {
                            userId: req.user.id,
                            occuredAt: {
                                [Op.gte]: fromDate,
                                [Op.lte]: toDate,
                            }
                        },
                        order: [
                            ['occuredAt', 'ASC']
                        ]
                    }).then(stepReports => {
                        let datesOfSteps = [];
                        let steps = [];
                        stepReports.forEach(stepReport => {
                            datesOfSteps.push(stepReport.occuredAt.toLocaleDateString("el-GR"));
                            steps.push(stepReport.steps);
                        });

                        res.render('steps-history', {
                            datesOfSteps: datesOfSteps,
                            steps: steps,
                            path: '/steps-history'
                        });
                    }).catch(err => console.log(err));
                }
            }
        }
    }
};

exports.getWeatherData = (req, res, next) => {
    req.user.getStepReports({
        order: [
            ['occuredAt', 'ASC']
        ]
    }).then(stepReports => {
        let axiosGetRequests = [];
        stepReports.forEach(stepReport => {
            const tmpDate = new Date(stepReport.occuredAt);
            axiosGetRequests.push(
                axios.get("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Nea%20Filadelfeia/" +
                    tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate() + "/" +
                    tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate() +
                    "?unitGroup=metric&key=DDPPD7GRDMDXXWX3VFL7G5FDZ&contentType=json")
            );
        });

        Promise.all(axiosGetRequests)
            .then(results => {
                let weatherData = [];
                results.forEach(result => {
                    weatherData.push({
                        stepDate: result.data.days[0].datetime,
                        hourlyData: result.data.days[0].hours
                    });
                });

                res.render('weather-data', {
                    path: '/weather-data',
                    weatherData: weatherData
                });
            }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};