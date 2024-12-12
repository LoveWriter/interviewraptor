const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 600}); // 10 minutes

exports.cache = cache;

exports.setCache = (key, value) => {
    cache.set(key, value);
};
