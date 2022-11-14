const { Op, DataTypes } = require('sequelize');
const Axios = require('axios');
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
                        }
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
    req.user.getStepReports()
        .then(stepReports => {
            // let axiosGetRequests = [];
            // stepReports.forEach(stepReport => {
            //     const tmpDate = new Date(stepReport.occuredAt);
            //     axiosGetRequests.push(
            //         Axios.get("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Nea%20Filadelfeia/" +
            //             tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate() + "/" +
            //             tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate() +
            //             "?unitGroup=metric&key=DDPPD7GRDMDXXWX3VFL7G5FDZ&contentType=json")
            //     );
            // });

            let weatherData = [];

            // Promise.all(axiosGetRequests)
            //     .then(results => {
            //         results.forEach(result => {
            //             weatherData.push({
            //                 stepDate: result.days[0].datetime,
            //                 hourlyData: result.days[0].hours
            //             });
            //         });

            //         res.render('weather-data', {
            //             path: '/weather-data',
            //             weatherData: weatherData
            //         });
            //     })
            //     .catch(err => console.log(err));

            weatherData.push({
                stepDate: "2022-11-13",
                steps: 3000,
                hourlyData: [{
                    datetime: "00:00:00",
                    datetimeEpoch: 1668290400,
                    temp: 11.7,
                    feelslike: 11.7,
                    humidity: 80.82,
                    dew: 8.5,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 9.4,
                    windspeed: 3.1,
                    winddir: 323.0,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGEL",
                        "LGAV"
                    ],
                    source: "obs"
                },
                {
                    datetime: "01:00:00",
                    datetimeEpoch: 1668294000,
                    temp: 11.0,
                    feelslike: 11.0,
                    humidity: 81.74,
                    dew: 8.0,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 10.8,
                    windspeed: 5.4,
                    winddir: 280.0,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGAV"
                    ],
                    source: "obs"
                },
                {
                    datetime: "02:00:00",
                    datetimeEpoch: 1668297600,
                    temp: 10.5,
                    feelslike: 10.5,
                    humidity: 87.43,
                    dew: 8.5,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 11.2,
                    windspeed: 4.0,
                    winddir: 56.6,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGEL",
                        "LGAV"
                    ],
                    "source": "obs"
                }]
            });

            weatherData.push({
                stepDate: "2022-11-14",
                hourlyData: [{
                    datetime: "00:00:00",
                    datetimeEpoch: 1668290400,
                    temp: 11.7,
                    feelslike: 11.7,
                    humidity: 80.82,
                    dew: 8.5,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 9.4,
                    windspeed: 3.1,
                    winddir: 323.0,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGEL",
                        "LGAV"
                    ],
                    source: "obs"
                },
                {
                    datetime: "01:00:00",
                    datetimeEpoch: 1668294000,
                    temp: 11.0,
                    feelslike: 11.0,
                    humidity: 81.74,
                    dew: 8.0,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 10.8,
                    windspeed: 5.4,
                    winddir: 280.0,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGAV"
                    ],
                    source: "obs"
                },
                {
                    datetime: "02:00:00",
                    datetimeEpoch: 1668297600,
                    temp: 10.5,
                    feelslike: 10.5,
                    humidity: 87.43,
                    dew: 8.5,
                    precip: 0.0,
                    precipprob: 0.0,
                    snow: 0.0,
                    snowdepth: 0.0,
                    preciptype: null,
                    windgust: 11.2,
                    windspeed: 4.0,
                    winddir: 56.6,
                    pressure: 1026.0,
                    visibility: 10.0,
                    cloudcover: 25.0,
                    solarradiation: 0.0,
                    solarenergy: null,
                    uvindex: 0.0,
                    severerisk: 10.0,
                    conditions: "Partially cloudy",
                    icon: "partly-cloudy-night",
                    stations: [
                        "LGEL",
                        "LGAV"
                    ],
                    source: "obs"
                }]
            });


            res.render('weather-data', {
                path: '/weather-data',
                weatherData: weatherData
            });
        }).catch(err => console.log(err));
};