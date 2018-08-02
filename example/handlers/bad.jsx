'use strict'
const React = require('react')

module.exports = class Bad extends React.Component {
  render () {
    throw new Error('I have been bad')
  }
}
