'use strict'
// vim: set ts=2 sw=2 expandtab:
const ReactDOM = require('react-dom')
const rem = require('./index')

module.exports = rem((component, opts, req, res, done) => {
  ReactDOM.hydrate(component, getEl(opts), done)
})

module.exports.render = rem((component, opts, req, res, done) => {
  ReactDOM.render(component, getEl(opts), done)
})

function getEl (opts) {
  let el = opts.el
  if (typeof el === 'string') {
    el = document.querySelector(el)
  } else if (typeof el === 'function') {
    el = el()
  }
  return el
}
