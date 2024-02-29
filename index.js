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

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCEDEFGHIJKLMNOPQRSTURVWXYabceefghijklmnopqurstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email'
    const queryParams = querystring.stringify({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUrl,
        state: state,
        scope: scope
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.get('callback', (req, res) => {
    res.send('callback');
})

app.listen(port, () => {
    console.log(`Express app runnning at ${port}`)
})