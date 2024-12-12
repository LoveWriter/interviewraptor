"user strict";

const {getLocation, getWeather} = require('../services/location-weather-svc.js');
const cache = require('../utils/cache');

function validateIPAddress(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.([0-9]{1,3}\.){2}[0-9]{1,3}$/;// 244.178.44.111
    return ipRegex.test(ip);
};
async function getWeatherByLocation(req, res, next) {
    try {
        const IP = req.query.ip || req.ip;

        if (!validateIPAddress(IP)) {
            req.log.info({
                "msg": "Invalid IPV4 address",
                IP
            })
            return res.sendStatus(400);
        }

        const locationData = await getLocation(IP);
        const weatherData = await getWeather(locationData);

        /* 
        */
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