require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat: lat,
                lon: lon,
                lang: 'fr',
                appid: process.env.API_KEY_WEATHER
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/computeRoutes', async (req, res) => {
    try {
        const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'routes.legs.steps.transitDetails'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});