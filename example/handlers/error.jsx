'use strict'
const React = require('react')
const Header = require('../components/header.jsx')

module.exports = class FourOhFour extends React.Component {
  render () {
    return (
      <Header>
        <h2>Error {this.props.$error.code || this.props.$error.name}</h2>
        <p>{this.props.$error.message}</p>
        <a href="/">Back</a>
      </Header>
    )
  }
}
