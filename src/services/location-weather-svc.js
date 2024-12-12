
function fetchWrapper(url, options) { // top level fetch wrapper to be used for all external api calls
    return fetch(url, options)
        .then(response => {
            console.log("RESSSSS", response); // eslint-disable-line no-console
            if (response === null) {
                throw new Error('Response is null');
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json().catch(error => {
                throw new Error(`Error parsing response as JSON: ${error}`);
            });
        })
        .catch(error => {
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                throw new Error('Failed to fetch. Check your internet connection.');
            }
            throw new Error(`Error making request: ${error}`);
        });
}

async function getLocation(ip) { // fetches location data based on ip address
    if (typeof ip !== 'string' || ip.trim() === '') { // checking for string and if extra spaces are present
        throw new Error('Invalid IP address');
    }
    const url = `${process.env.IPBASEURL}/${ip}?access_key=${process.env.IPKEY}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        return await fetchWrapper(url, options);
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Failed to fetch. Check your internet connection.');
        }
        throw new Error(`Error making request: ${error}`);
    }
}
function normalizeCityName(city) { // for some reason HYDERABAD comes as "city": "Hyderābād"
    return city.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Removes diacritical marks
}
async function getWeather(location) { // fetches weather data based on location

    const url = `${process.env.WBASEURL}?q=${normalizeCityName(location.city)}&appid=${process.env.WKEY}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return await fetchWrapper(url, options);
}

exports.getLocation = getLocation;
exports.getWeather = getWeather;