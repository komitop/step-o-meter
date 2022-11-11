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

module.exports = router;