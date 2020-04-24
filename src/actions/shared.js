import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import {showLoading, hideLoading} from "react-redux-loading";

export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

function addAnswer({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER,
    qid,
    answer,
    authedUser,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddAnswer(qid, answer) {
  return (dispatch, getState) => {
    const {authedUser} = getState();
    dispatch(showLoading());
    _saveQuestionAnswer({authedUser, qid, answer})
      .then(() => dispatch(addAnswer({authedUser, qid, answer})))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion({optionOneText, optionTwoText}) {
  return (dispatch, getState) => {
    const {authedUser} = getState();
    dispatch(showLoading());
    _saveQuestion({optionOneText, optionTwoText, author: authedUser})
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
