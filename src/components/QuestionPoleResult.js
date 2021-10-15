import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const QuestionPoleResult = ({ authedUser, user, question }) => {



  const votesCount = question ? question.optionOne.votes.length + question.optionTwo.votes.length : 0
  const op1Count = question ? question.optionOne.votes.length : 0
  const op2Count = question ? question.optionTwo.votes.length : 0
  const b1 = question ? question.optionOne.votes.includes(authedUser) : false
  const b2 = question ? question.optionTwo.votes.includes(authedUser) : false
  
 if (authedUser === '') return <Redirect to={{
  pathname: '/login',
  state: { from: '/error' }
}} />
  return (
    <div>
      <h3>Asked by {user ? user.name : ""}</h3>
      <img width='50' height='50'
        src={user ? user.avatarURL : ""}
        alt={`Avatar of ${user ? user.name : ""}`}
      />

      <div>
        would you rather {question ? question.optionOne.text : ""}
        <span> {question ? op1Count * 100 / votesCount : 0} % {b1 && "your vote"}</span>
      </div>
      <div> {op1Count} out of {votesCount} votes</div>

      <div>
        would you rather {question ? question.optionTwo.text : ""}
        <span> {question ? op2Count * 100 / votesCount : 0} % {b2 && "your vote"}</span>
      </div>
      <div>{op2Count} out of {votesCount} votes </div>
    </div>
  )

}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match ? props.match.params : props
  const question = questions[id]
  const user = question ? users[question.author] : null

  return {
    authedUser,
    user,
    question,
  }
}

export default connect(mapStateToProps)(QuestionPoleResult)
