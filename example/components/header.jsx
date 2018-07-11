'use strict'
// vim: set ts=2 sw=2 expandtab:
const React = require('react')

module.exports = class Header extends React.Component {
  render () {
    return (
      <div className='page-wrapper'>
        <header>
          <h1>h1 from 'Header'</h1>
        </header>
        {this.props.children}
        <footer>
          <h2>h2 from 'Footer'</h2>
        </footer>
      </div>
    )
  }
}
