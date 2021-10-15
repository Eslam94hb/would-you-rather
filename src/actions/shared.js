import { _getUsers, _getQuestions, _saveQuestionAnswer } from '../utils/_DATA'
import { recieveQuestions } from '../actions/questions'
import { recieveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = ''
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export function saveQuestionAnswer(qid, answer, authedUser) {
  return { type: SAVE_QUESTION_ANSWER, questionAnswer: { qid, answer, authedUser } }
}

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(recieveUsers(users))
        dispatch(recieveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}


export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    // dispatch(showLoading())

    return _saveQuestionAnswer({
      qid: qid,
      answer: answer,
      authedUser: authedUser
    })
      .then(() => { dispatch(saveQuestionAnswer(qid, answer, authedUser)) })
    // .then(() => dispatch(hideLoading()))
  }
}