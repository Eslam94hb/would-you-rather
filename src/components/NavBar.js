import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  state = {
    opText1: '',
  }

  render() {
    const { authedUser, user } = this.props
    //if(authedUser==='') return <div></div>
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {authedUser !== '' &&
            <li>
              <span>Hello {user && user.name}  </span>

              <img width='50' height='50'
                src={user && user.avatarURL}
                alt={`Avatar of ${user && user.name}`}
                className='avatar'
              />
              <NavLink to='/login' activeClassName='active'>
                Logout
              </NavLink>
            </li>
          }
        </ul>
      </nav>
    )
  }
}
function mapStateToProps({ authedUser, users }) {
  const user = users ? users[authedUser] : null
  return {
    authedUser,
    user,
  }
}
export default connect(mapStateToProps)(NavBar)

