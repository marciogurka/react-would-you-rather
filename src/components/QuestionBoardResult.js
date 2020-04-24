import React, {useState, useEffect} from "react";

const QuestionBoardResult = (props) => {
  const {question, author, authedUser} = props;
  const optionOneVotes = question.optionOne.votes;
  const optionTwoVotes = question.optionTwo.votes;

  const [answer, setAnswer] = useState(false);

  const checkUserAnswer = (optionOneVotes, optionTwoVotes, authedUser) => {
    if (optionOneVotes && optionOneVotes.includes(authedUser)) {
      setAnswer("optionOne");
    } else if (optionTwoVotes && optionTwoVotes.includes(authedUser)) {
      setAnswer("optionTwo");
    } else {
      setAnswer(false);
    }
  };

  const votes = {
    optionOne: optionOneVotes.length,
    optionTwo: optionTwoVotes.length,
    total: optionOneVotes.length + optionTwoVotes.length,
  };

  useEffect(() => {
    checkUserAnswer(optionOneVotes, optionTwoVotes, authedUser);
  }, [optionOneVotes, optionTwoVotes, authedUser]);

  const calculatePercentage = (countedVotes, total) => {
    return (countedVotes / total) * 100;
  };

  return (
    <div className="question-board-result container">
      <div className="box column is-half is-offset-one-quarter">
        <div className="author">
          <figure className="image is-64x64">
            <img
              className="is-rounded"
              src={author.avatarURL}
              alt={author.name}
            />
          </figure>
          <span className="is-size-6">{author.name}</span>
        </div>
        <div className="box-content">
          <p className="has-text-centered is-size-3">Results</p>
          <ul className="options has-text-centered">
            <li className={answer === "optionOne" ? "answer" : ""}>
              <p>
                Would you rather {question.optionOne.text}?
                {answer === "optionOne" && (
                  <span className="tag is-link">You choose this!</span>
                )}
              </p>
              <progress
                className="progress is-primary"
                value={calculatePercentage(votes.optionOne, votes.total)}
                max="100"
              >
                {calculatePercentage(votes.optionOne, votes.total).toFixed(2)} %
              </progress>
              <p>
                {votes.optionOne} ouf of {votes.total} votes
              </p>
            </li>
            <li className={answer === "optionTwo" ? "answer" : ""}>
              <p>
                Would you rather {question.optionTwo.text}?
                {answer === "optionTwo" && (
                  <span className="tag is-link">You choose this!</span>
                )}
              </p>
              <progress
                className="progress is-primary"
                value={calculatePercentage(votes.optionTwo, votes.total)}
                max="100"
              >
                {calculatePercentage(votes.optionTwo, votes.total).toFixed(2)} %
              </progress>
              <p>
                {votes.optionTwo} ouf of {votes.total} votes
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionBoardResult;
