'use strict'
const express = require('express')
const ejs = require('consolidate').ejs
const routes = require('./routes')
const serveStatic = require('serve-static')

// Set up app and templating
const app = express()
app.engine('html', ejs)
app.set('view engine', 'html')
app.set('views', './templates')

// Set up routes
const subApp = express.Router()
routes(subApp)
app.use('/', subApp)

// Serve static assets
app.use('/static', serveStatic('.'))

// Start server
app.listen('1234', function () {
  console.log('Listening on 1234')
})
