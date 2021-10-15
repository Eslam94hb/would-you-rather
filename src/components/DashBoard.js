import React from 'react'
import UserScore from './UserScore'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const DashBoard = ({ users , authedUser}) => {
  
if(authedUser === '' || authedUser === null)   
  return <Redirect to={{
  pathname: '/login',
  state: { from: '/leaderboard' }
}} />

const sortedUsers = Object.values(users).sort((a,b) => (Object.values(users[b.id].answers).length + Object.values(users[b.id].questions).length)
                          - (Object.values(users[a.id].answers).length + Object.values(users[a.id].questions).length))
   return (
      <div>
         <ul>
            {users && Object.values(sortedUsers).map(x => <li key={x.id}><UserScore user={x} /></li>)}
         </ul>
      </div>
   )

}

function mapStateToProps({ authedUser, users, questions }, { id }) {

   return {
      users,authedUser,
   }
}

export default connect(mapStateToProps)(DashBoard)
