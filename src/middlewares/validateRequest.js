
const validateIPAddress = ip => {
    const ipAddressRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){2}$/;

    if (typeof ip !== 'string' || ip.trim() === '') {
        return false;
    }

    return ipAddressRegex.test(ip);
};


const validateRequest = () => (req, res, next) => {
    if (!validateIPAddress(req.query.ip || req.ip)) {
        const IP = req.query.ip || req.ip;
        req.log.info({
            "msg": "Invalid IPV4 address",
            IP
        })
        return res.sendStatus(400);
    }
    next();
};

module.exports = validateRequest;