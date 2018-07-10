'use strict'
/* Context + isomorphic rendering */
const sharedContext = require('shared-context')
const reactExpressMiddleware = require('../')

/* View handlers */
const howdy = require('./handlers/howdy')
const adieu = require('./handlers/adieu/index.jsx')

module.exports = function (app) {
  app.use(reactExpressMiddleware({
    element: 'app-container'
  }), sharedContext())

  app.get('/', function (req, res) {
    res.redirect('/howdy')
  })
  app.get('/howdy', howdy)
  app.get('/adieu', adieu)
}
