import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect, withRouter } from 'react-router-dom'

class Login extends Component {
  state = {
    id: '',
    to: '',
  }
  componentDidMount() {
    this.props.dispatch(setAuthedUser(''))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(setAuthedUser(this.state.id))

    this.setState(() => ({
      toHome: this.state.id !== '' ? true : false,
    }))

   this.setState(() => ({
      to: (this.state.id !=='' && this.props.location.state && this.props.location.state.from)?this.props.location.state.from:'/'
    }))

  }
  handleChange = (e) => {
    this.setState(() => ({ id: e.target.value }))
  }
  render() {
    const users = this.props.users
//console.log(this.props.location.state)
    if (this.state.to !=='') return <Redirect to={this.state.to} />
    return (
      <div>
        <h3>Welcome to would you rather app</h3>
        <h4>please sign in to continue</h4>

        <form onSubmit={this.handleSubmit}>
          <h4>sign in</h4>
          <select onChange={this.handleChange}>
            <optgroup>
              {users && Object.values(users).map(x => <option key={x.id} value={x.id} onClick={this.handleChange}>{x.name}</option>)}

            </optgroup>
          </select>
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
