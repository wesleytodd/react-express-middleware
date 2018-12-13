'use strict'
// vim: set ts=2 sw=2 expandtab:
const rem = require('./index')

// Allow for overriding your own version of react-dom
let __ReactDOMServer
try {
  __ReactDOMServer = require('react-dom/server')
} catch (e) { }

module.exports = rem((component, opts, req, res, done) => {
  const ReactDOMServer = opts.ReactDOMServer || __ReactDOMServer
  if (typeof ReactDOMServer === 'undefined') {
    throw new TypeError('ReactDOMServer is required to run this middleware')
  }
  render(ReactDOMServer.renderToString, component, opts, req, res, done)
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
  const ReactDOMServer = opts.ReactDOMServer || __ReactDOMServer
  if (typeof ReactDOMServer === 'undefined') {
    throw new TypeError('ReactDOMServer is required to run this middleware')
  }
  render(ReactDOMServer.renderToStaticMarkup, component, opts, req, res, done)
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
