import React from "react";
import {connect} from "react-redux";

const LeaderboardPage = (props) => {
  const {users, authedUser} = props;
  return (
    <div className="leaderboard container">
      <h2 className="is-size-2 has-text-weight-bold has-text-centered">
        Leaderboard
      </h2>
      {users.map((user, i) => (
        <div key={user.id} className="column is-half is-offset-one-quarter">
          <div className={`box ${i === 0 && "hero is-primary"}`}>
            <div className="author">
              <figure className="image is-64x64">
                <img
                  className="is-rounded"
                  src={user.avatarURL}
                  alt={user.name}
                />
              </figure>
              <span className="is-size-3">{user.name}</span>
              {i === 0 && (
                <span>
                  <i className="fas fa-trophy"></i>
                </span>
              )}
              {user.id === authedUser && (
                <span className="tag is-info">That's you!</span>
              )}
            </div>
            <div className="box-content">
              <span className="has-text-centered is-size-5 has-text-weight-bold">
                {user.counts.points} points
              </span>
              <ul className="options">
                <li>
                  Answered questions: <span>{user.counts.answers}</span>
                </li>
                <li>
                  Created questions: <span>{user.counts.questions}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatUserStats = (users) => {
  return Object.values(users).map((user) => {
    return {
      ...user,
      counts: {
        answers: Object.keys(user.answers).length,
        questions: user.questions.length,
        points: Object.keys(user.answers).length + user.questions.length,
      },
    };
  });
};

function mapStateToProps({users, authedUser}) {
  return {
    authedUser,
    users: formatUserStats(users).sort(
      (a, b) => b.counts.points - a.counts.points
    ),
  };
}

export default connect(mapStateToProps)(LeaderboardPage);
