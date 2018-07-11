'use strict'
// vim: set ts=2 sw=2 expandtab:
const React = require('react')

module.exports = function (defaultRender) {
  return function storeMiddleware (Component, opts = {}) {
    // If not passed a component, throw
    if (!Component) {
      throw new TypeError('A component to render is required')
    }

    if (!(typeof Component === 'function' || Component.hasOwnProperty('$$typeof'))) {
      opts = Component || {}
      Component = opts.Component
    }

    // Default options
    const initialState = opts.initialState || Component.initialState || {}
    const reducer = opts.reducer || Component.reducer || ((s) => s)
    const createStore = opts.createStore || false
    const key = opts.key || 'content'
    const template = opts.template || 'index'
    const callNext = opts.callNext || false

    // Isomorphic default render method
    let renderMethod = opts.renderMethod || defaultRender

    // Get element to render into
    let el = opts.el || Component.el || '#app'
    if (typeof el === 'string' && typeof document !== 'undefined') {
      el = document.querySelector(el)
    } else if (typeof el === 'function') {
      el = el()
    }

    // Merge options strategy
    let mergeOptions
    if (opts.mergeOptions === false) {
      mergeOptions = (o) => o
    } else if (typeof opts.mergeOptions === 'function') {
      mergeOptions = opts.mergeOptions
    } else {
      mergeOptions = (o, req, res) => Object.assign(o, res.locals.reactExpressMiddlewareOptions || {})
    }

    return function (req, res, next) {
      const o = mergeOptions({
        Component,
        el,
        reducer,
        initialState,
        renderMethod,
        createStore,
        key,
        template,
        callNext
      }, req, res)

      // Make sure the component is renderable
      let _c = o.Component
      if (!_c.hasOwnProperty('$$typeof')) {
        _c = React.createFactory(_c)
      }

      function render () {
        const state = o.createStore === false
          ? Object.assign({}, o.initialState, res.locals)
          : Object.assign({ $dispatch: store.dispatch }, store.getState())

        o.renderMethod(_c(state), o, req, res, function (err) {
          if (!o.callNext) {
            return
          }
          next(err)
        })
      }

      // Setup the store?
      let store
      if (o.createStore !== false) {
        store = o.createStore(reducer, Object.assign({}, o.initialState, res.locals))

        // Subscribe to the store for renders
        store.subscribe(render)
      }

      render()
    }
  }
}
