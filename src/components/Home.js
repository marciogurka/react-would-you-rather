import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Home = (props) => {
  const {users} = props;
  const questions = {
    answered: props.answered,
    unanswered: props.unanswered,
  };
  const [activeTab, setActiveTab] = useState("unanswered");

  return (
    <div className="tabs container is-centered">
      <ul className="tabs-menu">
        <li
          className={`${activeTab === "unanswered" && "is-active"}`}
          onClick={() => setActiveTab("unanswered")}
        >
          <a href="#unanswered">Unanswered Questions</a>
        </li>
        <li
          className={`${activeTab === "answered" && "is-active"}`}
          onClick={() => setActiveTab("answered")}
        >
          <a href="#answered">Answered Questions</a>
        </li>
      </ul>
      <div className="questions">
        {questions[activeTab] &&
          questions[activeTab].map((question) => (
            <div
              key={question.id}
              className="column is-two-fifths-mobile is-one-third-tablet"
            >
              <div className="box">
                <div className="author">
                  <figure className="image is-64x64">
                    <img
                      className="is-rounded"
                      src={users[question.author].avatarURL}
                      alt={users[question.author].name}
                    />
                  </figure>
                  <span className="is-size-6">
                    {users[question.author].name}
                  </span>
                </div>
                <div className="box-content">
                  <span className="has-text-centered is-size-5">
                    Would you rather?
                  </span>
                  <ul className="options">
                    <li>{question.optionOne.text}</li>
                    <li className="is-italic has-text-weight-bold">OR</li>
                    <li>{question.optionTwo.text}</li>
                  </ul>
                  <Link
                    to={`/questions/${question.id}`}
                    className="button is-link"
                  >
                    View Poll
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

function mapStateToProps({authedUser, users, questions}) {
  const sortedQuestions = Object.values(questions).sort(
    (a, b) => b.timestamp - a.timestamp
  );
  return {
    users,
    answered: sortedQuestions.filter((question) =>
      Object.keys(users[authedUser].answers).includes(question.id)
    ),
    unanswered: sortedQuestions.filter(
      (question) =>
        !Object.keys(users[authedUser].answers).includes(question.id)
    ),
  };
}

export default connect(mapStateToProps)(Home);
