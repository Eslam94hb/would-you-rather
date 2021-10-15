import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    opText1: '',
    opText2: '',
    toHome: false,
  }
  handleChange = (e, no) => {
    const text = e.target.value

    if (no === 1) this.setState(() => ({ opText1: text }))
    else this.setState(() => ({ opText2: text }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { opText1, opText2 } = this.state

    const { dispatch } = this.props

    dispatch(handleAddQuestion(opText1, opText2))

    this.setState(() => ({
      opText1: '',
      opText2: '',
      toHome: true
    }))
  }
  render() {
     if (this.props.authedUser === '') {
     return <Redirect to={{
  pathname: '/login',
  state: { from: '/add' }
}} />
    }
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }

    const { opText1, opText2 } = this.state


    // const optionLeft = 280 - opText1.length

    return (
      <div>
        <h1 className='center'>Create New Question</h1>
        <h3 className='center'>Complete The Question</h3>
        <h2 className='center'>Would You Rather...</h2>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <div>
            <textarea
              placeholder="Enter Option One Text Here"
              value={opText1}
              onChange={(e) => this.handleChange(e, 1)}
              className='textarea'
              maxLength={280}
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={opText2}
              onChange={(e) => this.handleChange(e, 2)}
              className='textarea'
              maxLength={280}
            />
          </div>
          <button
            className='btn'
            type='submit'
            disabled={opText1 === '' || opText2 === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {

  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
