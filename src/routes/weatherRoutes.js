const express = require('express');
const {getWeatherByLocation} = require('../controllers/weather');
const validateRequest = require('../middlewares/validateRequest');
const {weatherSchema} = require('../validators/weatherValidator');

const router = express.Router();

router.get(
    '/weather-by-ip',
    validateRequest(weatherSchema), // middleware
    getWeatherByLocation
);

module.exports = router;
