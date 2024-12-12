"user strict";

const {getLocation, getWeather} = require('../services/location-weather-svc.js');

async function getWeatherByLocation(req, res, next) {
    try {
        const IP = req.query.ip || req.ip;
        const locationData = await getLocation(IP);
        const weatherData = await getWeather(locationData);

        res.status(200).json({
            ip: IP,
            location:
            {
                city: locationData.city,
                country: locationData.country
            },
            weather: {
                temperature: weatherData.main.temp,
                humidity: weatherData.main.humidity,
                description: weatherData.weather[0].description
            }
        });
    } catch (error) {
        req.log.error({
            "msg": "Error in getWeatherByLocation",
            error
        })
        next(error);
    }
}

exports.getWeatherByLocation = getWeatherByLocation;