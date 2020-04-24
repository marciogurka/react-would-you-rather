import {GET_QUESTIONS} from "../actions/questions";
import {ADD_ANSWER, ADD_QUESTION} from "../actions/shared";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      const {questions} = action;
      return {
        ...state,
        ...questions,
      };
    case ADD_ANSWER:
      const {authedUser, qid, answer} = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    case ADD_QUESTION:
      const {question} = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
