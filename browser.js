'use strict'
// vim: set ts=2 sw=2 expandtab:
const rem = require('./index')

module.exports = rem((component, opts, req, res, done) => {
  if (typeof module.exports.__ReactDOM === 'undefined') {
    throw new TypeError('ReactDOM is required to run this middleware')
  }
  module.exports.__ReactDOM.hydrate(component, getEl(opts), done)
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
  if (typeof module.exports.__ReactDOM === 'undefined') {
    throw new TypeError('ReactDOM is required to run this middleware')
  }
  module.exports.__ReactDOM.render(component, getEl(opts), done)
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

// For development purposes, allows linking and not
// requiring a local copy of react
try {
  module.exports.__ReactDOM = require('react-' + 'dom')
} catch (e) { }
