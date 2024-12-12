const express = require('express');
const pino = require('pino-http')();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const weatherRoutes = require('./src/routes/weatherRoutes');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

app.use(limiter);
app.use(pino);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

dotenv.config();

app.use('/api', weatherRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
