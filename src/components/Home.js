import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Home extends Component {
  state = {
    viewUnAnsweredQuestions: true,
  }
  handleClick = (e, b) => {

    e.preventDefault()
    this.setState(() => ({
      viewUnAnsweredQuestions: b,
    }))
  }


  render() {
    const { authedUser, questions } = this.props
    if (authedUser === '') return <Redirect to={{
  pathname: '/login',
  state: { from: '/' }
}} />
    const AllQuestions = Object.values(questions)
    const QuestionAnsweredByAutherdUser = AllQuestions.filter(x => x.optionOne.votes.includes(authedUser)
      || x.optionTwo.votes.includes(authedUser)).sort((a,b) => questions[b.id].timestamp - questions[a.id].timestamp)

    const QuestionToBeAnsweredByAutherdUser = AllQuestions.filter(x => !x.optionOne.votes.includes(authedUser)
      && !x.optionTwo.votes.includes(authedUser)).sort((a,b) => questions[b.id].timestamp - questions[a.id].timestamp)


    return (

      <div>
        <a href='#t' onClick={(e) => this.handleClick(e, true)}>UnAnswered Questions</a>
        <span>   <a href='#t' onClick={(e) => this.handleClick(e, false)}>Answered Questions</a></span>
        {this.state.viewUnAnsweredQuestions === true &&
          <ul>
            {QuestionToBeAnsweredByAutherdUser && QuestionToBeAnsweredByAutherdUser.map(x => <li key={x.id}><Question id={x.id} isFromHome={true} /></li>)}
          </ul>}
        {this.state.viewUnAnsweredQuestions === false &&

          <ul>
            {QuestionAnsweredByAutherdUser && QuestionAnsweredByAutherdUser.map(x => <li key={x.id}><Question id={x.id} isFromHome={true} /></li>)}
          </ul>
        }
      </div>


    )

  }
}
function mapStateToProps({ authedUser, users, questions }) {

  return {
    authedUser,
    users,
    questions,
  }
}

export default connect(mapStateToProps)(Home)
