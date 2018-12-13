'use strict'
// vim: set ts=2 sw=2 expandtab:
const rem = require('./index')

// Allow for overriding your own version of react-dom
let __ReactDOM
try {
  __ReactDOM = require('react-dom')
} catch (e) { }

module.exports = rem((component, opts, req, res, done) => {
  const ReactDOM = opts.ReactDOM || __ReactDOM
  if (typeof ReactDOM === 'undefined') {
    throw new TypeError('ReactDOM is required to run this middleware')
  }
  ReactDOM.hydrate(component, getEl(opts), done)
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
  const ReactDOM = opts.ReactDOM || __ReactDOM
  if (typeof ReactDOM === 'undefined') {
    throw new TypeError('ReactDOM is required to run this middleware')
  }
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
