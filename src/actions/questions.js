import {_getQuestions} from "../utils/_DATA";
import {showLoading, hideLoading} from "react-redux-loading";

export const GET_QUESTIONS = "GET_QUESTIONS";

function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function handleGetQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getQuestions()
      .then((questions) => dispatch(getQuestions(questions)))
      .then(() => dispatch(hideLoading()));
  };
}
