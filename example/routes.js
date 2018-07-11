'use strict'
// vim: set ts=2 sw=2 expandtab:
/* Context + isomorphic rendering */
const sharedContext = require('shared-context')
const reactExpressMiddleware = require('../')

/* View handlers */
const howdy = require('./handlers/howdy.jsx')
const adieu = require('./handlers/adieu.jsx')

module.exports = function (app) {
  app.use(sharedContext())
  app.get('/', function (req, res) {
    res.redirect('/howdy/wes')
  })

  // Setup some data in a middelware to be used in rendering
  app.get('/:salutation/:name', function (req, res, next) {
    res.locals.name = req.params.name
    res.locals.adjective = 'baffling'
    next()
  })

  // Render the views
  app.get('/howdy/:name', reactExpressMiddleware(howdy))
  app.get('/adieu/:name', reactExpressMiddleware(adieu))
}
