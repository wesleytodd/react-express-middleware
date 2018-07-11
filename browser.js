'use strict'
// vim: set ts=2 sw=2 expandtab:
const ReactDOM = require('react-dom')

module.exports = require('./index')((component, opts, req, res, done) => {
  ReactDOM.render(component, opts.el, done)
})
