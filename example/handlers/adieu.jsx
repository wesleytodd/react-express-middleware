'use strict'
// vim: set ts=2 sw=2 expandtab:
const React = require('react')
const Header = require('../components/header.jsx')

module.exports = class Adieu extends React.Component {
  constructor (props) {
    super(props)
    this.onNameChange = this.onNameChange.bind(this)
  }
  render () {
    return (
      <Header>
        <h2>Adieu {this.props.name}</h2>
        <input onChange={this.onNameChange} value={this.props.name} />

        <h3>Some Fake Server Data</h3>
        {this.props.data && <textarea defaultValue={JSON.stringify(this.props.data, null, '  ')} />}
      </Header>
    )
  }

  static reducer (state, action) {
    if (action.type === 'loadDataFromServer') {
      state.data = action.data
    }
    if (action.type === 'changeName') {
      state.name = action.name
    }
    return state
  }

  onNameChange (e) {
    this.props.$dispatch({
      type: 'changeName',
      name: e.target.value
    })
  }
}
