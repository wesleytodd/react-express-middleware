'use strict'
// vim: set ts=2 sw=2 expandtab:
const ReactDOMServer = require('react-dom/server')
const rem = require('./index')

module.exports = rem((component, opts, req, res, done) => {
  render(ReactDOMServer.renderToString, component, opts, req, res, done)
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
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
