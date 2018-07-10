'use strict'
// vim: set ts=2 sw=2 expandtab:
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const setPrototypeOf = require('setprototypeof')

module.exports = function reactExpressMiddlewareGenerator (opts) {
  const options = opts || {}
  options.template = options.template || 'index'
  options.key = options.key || 'content'
  options.renderMethod = options.renderMethod || ReactDOMServer.renderToString

  // Allow for option overrides per-route
  options.mergeOptions = typeof options.mergeOptions === 'function' ? options.mergeOptions : function (req, res) {
    return Object.assign({}, options, res.locals.reactExpressMiddlewareOptions)
  }

  return function reactExpressMiddleware (req, res, next) {
    res.renderReactComponent = function renderReactComponent (Component, store, done) {
      if (typeof store === 'function') {
        done = store
        store = undefined
      }

      // Merge the route options
      const o = options.mergeOptions(req, res)

      if (!Component.hasOwnProperty('$$typeof')) {
        // store defaults to res.locals
        if (typeof store !== 'object') {
          store = res.locals

          // Override prototype on res.locals because react
          // uses res.locals.hasOwnProperty and Express specifically
          // uses Object.create(null) which means it doesn't have hasOwnProperty
          setPrototypeOf(store, {})
        }
        // Create factory for component
        Component = React.createFactory(Component)(store)
      }

      // Render template with string
      res.render(o.template, {
        [o.key]: o.renderMethod(Component)
      }, done)
    }
    next()
  }
}
