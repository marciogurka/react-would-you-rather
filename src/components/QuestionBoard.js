import React, {useState} from "react";

const QuestionBoard = (props) => {
  const {question, author, handleAddAnswer} = props;
  const [userAnswer, setUserAnswer] = useState(null);

  const handleInputChange = (option) => {
    setUserAnswer(option);
  };

  const addAnswer = (e) => {
    e.preventDefault();
    console.log(question);
    const questionId = question.id;
    handleAddAnswer(questionId, userAnswer);
  };

  return (
    <div className="question-board container">
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
        <form className="box-content" onSubmit={addAnswer}>
          <p className="has-text-centered is-size-3">Would you rather?</p>
          <div className="options has-text-centered">
            <label className="checkbox">
              <input
                id="optionOne"
                type="radio"
                name="answer"
                value="optionOne"
                onInput={() => handleInputChange("optionOne")}
              />
              <span className="checkmark"></span>
              {question.optionOne.text}
            </label>
            <p className="is-italic has-text-weight-bold has-text-centered ">
              OR
            </p>
            <label className="checkbox">
              <input
                id="optionTwo"
                type="radio"
                name="answer"
                value="optionTwo"
                onInput={() => handleInputChange("optionTwo")}
              />
              <span className="checkmark"></span>
              {question.optionTwo.text}
            </label>
          </div>
          <div className="has-text-centered">
            <button
              className="button is-link"
              disabled={!userAnswer}
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionBoard;
