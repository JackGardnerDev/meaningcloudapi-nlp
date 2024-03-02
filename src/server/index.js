const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/analyze', async function (req, res) {
    const { text } = req.body;

    try {
        const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `key=${process.env.MEANINGCLOUD_API_KEY}&lang=en&txt=${encodeURIComponent(text)}`
        });

        if (!response.ok) {
            throw new Error('Failed to analyze!');
        }

        const data = await response.json();

        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred during analysis!');
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

var textapi = new meaning({
    application_key: process.env.API_KEY
});

console.log(`Your API key is ${process.env.API_KEY}`);