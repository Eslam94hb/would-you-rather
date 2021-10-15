import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/shared'
import { Redirect, Link } from 'react-router-dom'

class Question extends Component {
  state = {
    Answer: 'optionOne',
    toPole: false,
  }
  handleChange = (e) => {
    const v = e.target.value

    this.setState(() => ({
      Answer: v
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { Answer } = this.state

    const { dispatch, id } = this.props

    dispatch(handleSaveQuestionAnswer(id, Answer))

    this.setState(() => ({
      toPole: id ? true : false,
    }))
  }

  render() {
    const { optionOne, optionTwo, auther,question, avatarURL, id, isFromHome,authedUser, IsAnswered } = this.props
    const { toPole } = this.state
    
      if (authedUser === '' && question) return <Redirect to={{
  pathname: '/login',
  state: { from: `/question/${id}` }
}} />
      else if (authedUser === '' && !question) return <Redirect to={{
  pathname: '/login',
  state: { from: '/error' }
}} />
    //console.log(id)
    if (toPole === true) {
      return <Redirect to={`/pole/${id}`} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h4>{auther} asks:</h4>
          <img width='50' height='50'
            src={avatarURL}
            alt={`Avatar of ${auther}`}
            className='avatar'
          />

          <h3>Would You Rather...</h3>

          {isFromHome &&
            <div>
              <div>..{optionOne}..</div>
              <div><Link to={IsAnswered ? `/pole/${id}` : `/question/${id}`}>View Pole</Link></div><br /><br />
            </div>
          }
          {!isFromHome &&
            <div>
              <input type="radio" value="optionOne" name="option" checked={this.state.Answer === 'optionOne'}
                onChange={this.handleChange} /> {optionOne} <br />
              <input type="radio" value="optionTwo" name="option" checked={this.state.Answer === 'optionTwo'}
                onChange={this.handleChange} /> {optionTwo}
              <div><button type='submit'>Submit</button></div>
            </div>
          }

        </div>
      </form>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match ? props.match.params : props
  //const { IsFromHome } = props
  const question = questions[id]
  const user = question ? users[question.author] : null
  const IsAnswered = users && authedUser ? Object.keys(users[authedUser].answers).includes(id) : false
  return {
    IsAnswered,
    authedUser,
    question,
    id,
    optionOne: question ? question.optionOne.text : null,
    optionTwo: question ? question.optionTwo.text : null,
    auther: user ? user.name : null,
    avatarURL: user ? user.avatarURL : null,
  }
}

export default connect(mapStateToProps)(Question)