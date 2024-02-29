require('dotenv').config();
const querystring = require('querystring');
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
    const queryParams = querystring.stringify({
        client_id: clientId,
        response_type: 'code', 
        redirect_uri: redirectUrl
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.listen(port, () => {
    console.log(`Express app runnning at ${port}`)
})