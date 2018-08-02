'use strict'
// vim: set ts=2 sw=2 expandtab:
const React = require('react')
const Header = require('../components/header.jsx')

module.exports = function Howdy (props) {
  return (
    <Header>
      <h2>Content Container</h2>
      <p>This route is rendered by passing in a parent container to res.renderReactComponent.</p>
      <p>In this method, whatever is stored on res.locals.context is available by default.</p>
      <p>Howdy. It's a {props.context.adjective} day {props.name}.</p>
    </Header>
  )
}
