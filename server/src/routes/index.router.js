const router = require('express').Router();

// Importing controllers
const indexController = require('../controllers/index.controller');

// Defining routes
router.all('/alert', indexController.sendAlertEmail);

module.exports = router;
