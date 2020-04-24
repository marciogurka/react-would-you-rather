import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {handleGetQuestions} from "../actions/questions";
import {LoadingBar} from "react-redux-loading";
import Header from "./Header";
import Home from "./Home";
import QuestionPage from "./QuestionPage";
import NewQuestionPage from "./NewQuestionPage";
import LeaderboardPage from "./LeaderboardPage";
import Page404 from "./Page404";

const HomePage = (props) => {
  const {loading, handleGetQuestions} = props;

  useEffect(() => {
    handleGetQuestions();
  }, [handleGetQuestions]);

  return (
    <div>
      <LoadingBar />
      {!loading && (
        <div className="app-container">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={NewQuestionPage} />
            <Route path="/questions/:id" component={QuestionPage} />
            <Route path="/leaderboard" component={LeaderboardPage} />
            <Route component={Page404} />
          </Switch>
        </div>
      )}
    </div>
  );
};

function mapStateToProps({questions}) {
  return {
    loading: Object.keys(questions).length === 0,
  };
}

export default connect(mapStateToProps, {handleGetQuestions})(HomePage);
