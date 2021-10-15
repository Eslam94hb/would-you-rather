import { RECIEVE_QUESTIONS } from '../actions/questions'
import { ADD_QUESTION } from '../actions/questions'
import { SAVE_QUESTION_ANSWER } from '../actions/shared'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIEVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }

    case SAVE_QUESTION_ANSWER:
      const qid = action.questionAnswer.qid
      const answer = action.questionAnswer.answer
      const authedUser = action.questionAnswer.authedUser
      const newState = { ...state }
      //console.log("xxxx")

      if (answer === "optionOne") {
        newState[qid].optionOne.votes = [...newState[qid].optionOne.votes, authedUser]
        const op2 = newState[qid].optionTwo.votes.filter(x => x !== authedUser)
        newState[qid].optionTwo.votes = op2
      }
      else {
        newState[qid].optionTwo.votes = [...newState[qid].optionTwo.votes, authedUser]
        const op2 = newState[qid].optionOne.votes.filter(x => x !== authedUser)
        newState[qid].optionOne.votes = op2
      }

      return newState

    default:
      return state
  }
}