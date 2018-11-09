'use strict'
// vim: set ts=2 sw=2 expandtab:
const rem = require('./index')

// Optional dep
let _ReactDOM
try {
  _ReactDOM = require('react-dom')
} catch (e) { }

module.exports = rem((component, opts, req, res, done) => {
  const ReactDOM = opts.ReactDOM || _ReactDOM
  if (typeof ReactDOM === 'undefined') {
    throw new TypeError('ReactDOM is required to run this middleware')
  }
  if (ReactDOM === _ReactDOM) {
    ReactDOM.hydrate(component, getEl(opts), done)
  } else {
    const el = getEl(opts)
    ReactDOM.hydrate(component, el, el.firstChild)
    done()
  }
})
module.exports.hydrate = module.exports

module.exports.render = rem((component, opts, req, res, done) => {
  const ReactDOM = opts.ReactDOM || _ReactDOM
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

