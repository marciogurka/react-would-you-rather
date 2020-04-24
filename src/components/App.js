import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import LoadingBar from "react-redux-loading";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

const App = (props) => {
  const {authedUser} = props;
  return (
    <Router basename="/">
      <>
        <LoadingBar />
        <div className="app-container">
          {!authedUser ? (
            <Route path="/" component={LoginPage} />
          ) : (
            <Route path="/" component={HomePage} />
          )}
        </div>
      </>
    </Router>
  );
};

function mapStateToProps({authedUser}) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
