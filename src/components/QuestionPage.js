import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {handleAddAnswer} from "../actions/shared";
import Page404 from "./Page404";

import QuestionBoardResult from "./QuestionBoardResult";
import QuestionBoard from "./QuestionBoard";

const Question = (props) => {
  const {question, users, authedUser, handleAddAnswer} = props;

  if (!question) return <Page404 />;

  const author = users[question.author];

  return Object.keys(users[authedUser].answers).includes(question.id) ? (
    <QuestionBoardResult
      question={question}
      authedUser={authedUser}
      author={author}
    />
  ) : (
    <QuestionBoard
      question={question}
      author={author}
      handleAddAnswer={handleAddAnswer}
    />
  );
};

function mapStateToProps({users, authedUser, questions}, props) {
  const question = questions[props.match.params.id];
  return {
    users,
    authedUser,
    question,
  };
}

export default withRouter(
  connect(mapStateToProps, {handleAddAnswer})(Question)
);
