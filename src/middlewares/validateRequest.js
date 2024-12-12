const validateRequest = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.query, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            error: 'Validation Error',
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

module.exports = validateRequest;
