import React from 'react'

const UserScore = ({ user }) => {

  return (
    <div>
      <h3>{user ? user.name : ""}</h3>
      <img width='50' height='50'
        src={user ? user.avatarURL : ""}
        alt={`Avatar of ${user ? user.name : ""}`}
      />

      <div> Answered Questions: {user && Object.values(user.answers).length}</div>
      <div> Created Questions:  {user && user.questions.length}</div>
      <div> Score: {user && Object.values(user.answers).length + Object.values(user.questions).length}   </div>

    </div>
  )

}



export default UserScore
