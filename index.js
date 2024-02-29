require('dotenv').config();
const express = require('express');
const port = 8000;
const app = express();
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const redirectUrl = process.env.REDIRECT_URL;

app.get('/', (req, res) => {
    // res.send("hello")
    const data = {
        name: 'Jashan',
        isAwesome: true
    }
    res.json(data);
})

app.get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}`)
})

app.listen(port, () => {
    console.log(`Express app runnning at ${port}`)
})