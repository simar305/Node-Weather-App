const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=d22627f5027679b0b03f284b2f3ecf84&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to detect location.', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                icon: body.current.weather_icons[0],
                description: body.current.weather_descriptions,
                feelslike: body.current.feelslike,
                sunrise: body.current.astro.sunrise,
                sunset: body.current.astro.sunset,
                rainChances: body.current.precip,
                qualityIndex: body.current.air_quality['us-epa-index'],
            })
        }
    })
}

module.exports = forecast;