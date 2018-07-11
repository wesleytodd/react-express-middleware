'use strict'
const React = require('react')
const Header = require('../components/header.jsx')

module.exports = class Adieu extends React.Component {
  render () {
    return (
      <Header>
        <h2>Content Container</h2>
        <p>This route is rendered using nested jsx passed to res.renderReactComponent.</p>
        <p>In this method, any needed props need to be directly passed in to the jsx.</p>
        <p>Adieu, {this.props.adjective} {this.props.name}</p>
      </Header>
    )
  }
}
