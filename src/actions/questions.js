import { _saveQuestion } from '../utils/_DATA'

export const RECIEVE_QUESTIONS = "RECIEVE_QUESTIONS"
export const ADD_QUESTION = 'ADD_QUESTION'


export function recieveQuestions(questions) {
  return { type: RECIEVE_QUESTIONS, questions }
}

function addQuestion(question) {
  return { type: ADD_QUESTION, question }
}


export function handleAddQuestion(opText1, opText2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    // dispatch(showLoading())

    return _saveQuestion({
      optionOneText: opText1,
      optionTwoText: opText2,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
    // .then(() => dispatch(hideLoading()))
  }
}

