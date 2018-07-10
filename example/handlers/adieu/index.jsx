'use strict'
const React = require('react')
const Header = require('../../components/header.jsx')
const Container = require('./container.jsx')

module.exports = function adieuHandler (req, res) {
  const RenderComponent = (
    <Header>
      <Container name='Lorelai' />
    </Header>
  )

  res.renderReactComponent(RenderComponent)
}
