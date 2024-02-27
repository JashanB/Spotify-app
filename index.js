const express = require('express');
const port = 8000;
const app = express();

app.get('/', (req, res) => {
    // res.send("hello")
    const data = {
        name: Jashan,
        isAwesome: true
    }
    res.json(data);
})

app.get('/awesome-generator', (req, res) => {
    const {name, isAwesome} = req.query;
    res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not '} awesome`)
})

app.listen(port, () => {
    console.log(`Express app runnning at ${port}`)
})