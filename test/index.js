'use strict'
// vim: set ts=2 sw=2 expandtab:
const assert = require('assert')
const {describe, it} = require('mocha')
const reactExpressMiddleware = require('../index')

const HELLO = () => 'Hello world!'
const render = reactExpressMiddleware((component, opts, req, res, done) => {
  // Test renderer
})

describe('React Express Middleware', function () {
  it('should return a function', function () {
    assert.equal(typeof render(HELLO), 'function')
  })
})
