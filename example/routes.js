'use strict'
// vim: set ts=2 sw=2 expandtab:
const reactExpressMiddleware = require('../')

/* Context + isomorphic rendering */
const sharedContext = require('shared-context')

/* View handlers */
const Howdy = require('./handlers/howdy.jsx')
// const Adieu = require('./handlers/adieu.jsx')
const FourOhFour = require('./handlers/404.jsx')
const BadView = require('./handlers/bad.jsx')
const ErrorView = require('./handlers/error.jsx')

module.exports = function (app) {
  app.get('/', (req, res) => res.redirect('/howdy/wes'))

  // Example for sharing data from the backend to the frontend in SSR apps
  app.use(sharedContext())

  // Setup some data in a middelware to be used in rendering
  app.get('/:salutation/:name', function (req, res, next) {
    res.locals.name = req.params.name

    // Added to the context shared from the backend,
    // this could be loaded from an api on the backend and then skipped on the frontend
    res.locals.context.adjective = res.locals.context.adjective || 'baffling'
    next()
  })

  //
  // Most basic example
  //
  app.get('/howdy/:name', reactExpressMiddleware(Howdy))

  //
  // Hook up a state container (think Redux)
  //
  // @TODO
  // app.get('/adieu/:name', reactExpressMiddlewareWithStateContainer(Adieu))

  //
  // Error handling
  //
  app.get('/bad', reactExpressMiddleware(BadView))
  app.use(reactExpressMiddleware(FourOhFour))
  app.use(reactExpressMiddleware(ErrorView, {
    handleErrors: true
  }))
}
