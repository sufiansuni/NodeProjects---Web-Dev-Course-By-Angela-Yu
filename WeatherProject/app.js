const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

app.use(express.urlencoded({extended: true}));

app.get('/', (_req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "7f74672d714fd0dadf870ccf7a246fe6";
    const unit = "metric";
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
    currentWeatherURL += `&units=${unit}`;

    https.get(currentWeatherURL, weatherRes => {
        console.log("Weather API Response Code: " + weatherRes.statusCode);
        weatherRes.on('data', data => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write(`<h1>Location: ${query}</h1>`);
            res.write(`<h2>Temperature: ${temp}</h2>`);
            res.write(`<h2>Description: ${desc}</h2>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">`);
            res.send();
        })
    })
})

app.listen(port, function() {
   console.log("Server is running on port " + port);
})
