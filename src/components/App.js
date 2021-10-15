import React, { Component } from 'react'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Home from './Home'
import QuestionPoleResult from './QuestionPoleResult'
import DashBoard from './DashBoard'
import Login from './Login'
import Error from './Error'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './NavBar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())

  }
  render() {

    return (
      <Router>
        <div className='container'>
          {this.props.authedUser && <NavBar />}
          <div>
            <Route path='/' exact component={Home} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={DashBoard} />
            <Route path='/login' component={Login} />
            <Route path='/pole/:id' component={QuestionPoleResult} />
            <Route path='/question/:id' component={Question} />
            <Route path='/error' component={Error} />

          </div>
        </div>
      </Router>
    )
  }
}
function mapStateToProps({ authedUser }) {

  return {
    authedUser,
  }
}
export default connect(mapStateToProps)(App)