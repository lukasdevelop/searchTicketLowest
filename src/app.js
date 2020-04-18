const express = require('express')
const app = express();
const routes = require('./routes.js')

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send('Bem vindo a API')
})

module.exports = app
