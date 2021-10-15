import { RECIEVE_USERS } from '../actions/users'
import { SAVE_QUESTION_ANSWER } from '../actions/shared'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIEVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case SAVE_QUESTION_ANSWER:
      const qid = action.questionAnswer.qid
      const answer = action.questionAnswer.answer
      const authedUser = action.questionAnswer.authedUser
      const newState = { ...state }

      newState[authedUser].answers[qid] = answer


      return newState
    default:
      return state
  }
}