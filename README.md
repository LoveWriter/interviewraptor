# Weather by IP Backend

## Overview
A Node.js backend API that retrieves weather information based on IP address using external location and weather services.

## Prerequisites
- Node.js 20+
- NODE-CACHE
- API Keys:
  - IPStack (Location Service)
  - OpenWeatherMap (Weather Service)

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
        PORT

        IPKEY
        WKEY

        IPBASEURL=http://api.ipstack.com/
        WBASEURL=https://api.openweathermap.org/data/2.5/weather?
   ```
4. Run the server: `npm run start`

## API Endpoints
- `GET /api/v1/weather-by-ip`: Retrieve weather by IP
  - Query param: `ip` (optional)
  - since this is local so req.ip will not work so please add ip as req.query.ip

## Testing
Run tests: `npm test`