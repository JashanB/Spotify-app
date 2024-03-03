require('dotenv').config();
const querystring = require('querystring');
const express = require('express');
const axios = require('axios');
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

    const scope = 'user-read-private user-read-email';
    const queryParams = querystring.stringify({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUrl,
        state: state,
        scope: scope
    });
    //triggers callback route
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
})

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
    })
        .then(response => {
            if (response.status === 200) {
                // const { access_token, token_type } = response.data;
                const { access_token, refresh_token } = response.data;

                //Use token to access profile
                // axios.get('https://api.spotify.com/v1/me', {
                //     headers: {
                //         Authorization: `${token_type} ${access_token}`
                //     }
                // })
                //     .then(response => {
                //         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
                //     })
                //     .catch(error => {
                //         res.send(error);
                //     });

                //Testing refresh token
                // axios.get(`http://localhost:8000/refresh_token?refresh_token=${refresh_token}`)
                //     .then(response => {
                //         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
                //     })
                //     .catch(error => {
                //         res.send(error);
                //     });
            } else {
                res.send(response);
            }
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

app.listen(port, () => {
    console.log(`Express app runnning at ${port}`)
})