'use strict'
const React = require('react')
const Header = require('../components/header.jsx')

module.exports = class FourOhFour extends React.Component {
  render () {
    return (
      <Header>
        <h2>Not Found</h2>
      </Header>
    )
  }
}
