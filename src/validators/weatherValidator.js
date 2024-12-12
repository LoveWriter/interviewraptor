const Joi = require('joi');

const weatherSchema = Joi.object({
    ip: Joi.string().ip().optional().allow('')
}).unknown(false);

module.exports = {weatherSchema};
