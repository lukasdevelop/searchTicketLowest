const express = require('express')
const routes = express.Router()
const QuoteController = require('./controllers/QuoteController')

routes.get('/quote/:from/:to', QuoteController.store)
routes.post('/route', QuoteController.create)

module.exports = routes;