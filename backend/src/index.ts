import express = require('express');

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send({ mesage: 'Hello' })
})

app.get('/test', (req, res) => {
    res.send('test')
})

app.listen(8000)