'use strict'
// vim: set ts=2 sw=2 expandtab:
const {isValidElementType} = require('react-is')

// peer/optional dep
let _React
try {
  _React = require('react')
} catch (e) {}

module.exports = function (defaultRender) {
  return function reactRenderMiddleware (Component, opts = {}) {
    // First arg was a component, not options
    if (!isValidElementType(Component)) {
      opts = Component || {}
      Component = opts.Component

      // If not passed a component, throw
      if (!isValidElementType(Component)) {
        throw new TypeError('A valid component is required')
      }
    }

    // Default options
    const React = opts.React || _React
    const ReactDOM = opts.ReactDOM
    const ReactDOMServer = opts.ReactDOMServer
    const initialState = opts.initialState || Component.initialState || {}
    const el = opts.el || '#app'
    const key = opts.key || 'content'
    const template = opts.template || 'index'
    const paramsKey = opts.paramsKey || '$params'
    const queryKey = opts.queryKey || '$query'
    const bodyKey = opts.bodyKey || '$body'
    const errorKey = opts.errorKey || '$error'
    const renderMethod = opts.renderMethod || defaultRender
    const handleErrors = opts.handleErrors || false
    const before = opts.before || ((opts, req, res, done) => done())
    const after = opts.after || ((err, render, next) => err && next(err))

    if (typeof React === 'undefined') {
      throw new TypeError('React is required to run this middleware')
    }

    // An error boundry wrapper
    const errorWrap = React.createFactory(class ErrorWrap extends React.Component {
      componentDidCatch (err, info) {
        this.props.onError(err, info)
      }
      render () {
        return this.props.children
      }
    })

    function mw (req, res, next) {
      const o = {
        ReactDOM,
        ReactDOMServer,
        Component,
        el,
        renderMethod,
        key,
        template
      }

      // Merge up state
      Object.assign(res.locals, {
        [paramsKey]: req.params,
        [queryKey]: req.query,
        [bodyKey]: req.body
      }, initialState, res.locals)

      before(o, req, res, (err) => {
        if (err) return next(err)

        render(res.locals, (err) => {
          after(err, render, next)
        })
      })

      function render (state, done) {
        // Make sure the component is renderable
        let _c = o.Component
        if (!_c.hasOwnProperty('$$typeof')) {
          _c = React.createFactory(_c)
        }

        // Wrap in an error boundry
        let hasErrored = false
        const comp = errorWrap({
          children: _c(res.locals),
          onError: (err) => { hasErrored = err }
        })

        // Call the actual render (different in browser and node)
        o.renderMethod(comp, o, req, res, (err) => {
          done(hasErrored || err)
        })
      }
    }

    if (handleErrors) {
      return (err, req, res, next) => {
        res.locals[errorKey] = err
        res.statusCode = err.statusCode || res.locals.statusCode || 500
        mw(req, res, next)
      }
    }

    return mw
  }
}
