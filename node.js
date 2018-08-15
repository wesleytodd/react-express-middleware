'use strict'
// vim: set ts=2 sw=2 expandtab:
const rem = require('./index')

module.exports = rem((component, opts, req, res, done) => {
  if (typeof module.exports.__ReactDOMServer === 'undefined') {
    throw new TypeError('ReactDOMServer is required to run this middleware')
  }
  render(module.exports.__ReactDOMServer.renderToString, component, opts, req, res, done)
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
  if (typeof module.exports.__ReactDOMServer === 'undefined') {
    throw new TypeError('ReactDOMServer is required to run this middleware')
  }
  render(module.exports.__ReactDOMServer.renderToStaticMarkup, component, opts, req, res, done)
})

function render (_render, component, opts, req, res, done) {
  res.render(opts.template, {
    [opts.key]: _render(component)
  }, (err, out) => {
    if (err) {
      return done(err)
    }
    res.end(out, done)
  })
}

// For development purposes, allows linking and not
// requiring a local copy of react
try {
  module.exports.__ReactDOMServer = require('react-' + 'dom/server')
} catch (e) { }
