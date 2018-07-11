'use strict'
// vim: set ts=2 sw=2 expandtab:
const ReactDOMServer = require('react-dom/server')

module.exports = require('./index')((component, opts, req, res, done) => {
  res.render(opts.template, {
    [opts.key]: ReactDOMServer.renderToString(component)
  }, (err, out) => {
    if (err) {
      return done(err)
    }
    res.end(out, done)
  })
})
