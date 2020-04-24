import React, {useState} from "react";
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/shared";

const NewQuestionPage = (props) => {
  const {history, handleAddQuestion} = props;
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if (name === "optionOneText") setOptionOneText(value);
    else if (name === "optionTwoText") setOptionTwoText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddQuestion({optionOneText, optionTwoText});
    history.push("/");
  };

  return (
    <div className="new-question-page container">
      <h2 className="is-size-2 has-text-weight-bold has-text-centered">
        New Question
      </h2>
      <div className="column is-half is-offset-one-quarter">
        <form className="new-question-form box" onSubmit={handleSubmit}>
          <p className="has-text-centered">Fill the gaps:</p>
          <h3 className="is-size-3 has-text-grey-light has-text-centered">
            Would you rather...
          </h3>
          <div className="field">
            <div className="control">
              <input
                className="input is-medium"
                type="text"
                placeholder="Option One Text"
                name="optionOneText"
                value={optionOneText}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p className="has-text-centered">OR</p>
          <div className="field">
            <div className="control">
              <input
                className="input is-medium"
                type="text"
                placeholder="Option Two Text"
                name="optionTwoText"
                value={optionTwoText}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="has-text-centered">
            <button
              className="button is-link"
              disabled={!optionOneText || !optionTwoText}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, {handleAddQuestion})(NewQuestionPage);
