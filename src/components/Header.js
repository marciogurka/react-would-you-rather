import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";

const Header = (props) => {
  const {user, setAuthedUser} = props;

  const handleLogout = () => {
    setAuthedUser(null);
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <a
          href="#navbar"
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            className="navbar-item"
            activeClassName="active"
            exact
            to="/"
          >
            <span>Home</span>
          </NavLink>
          <NavLink className="navbar-item" activeClassName="active" to="/add">
            <span>New Question</span>
          </NavLink>
          <NavLink
            className="navbar-item"
            activeClassName="active"
            to="/leaderboard"
          >
            <span>Leaderboard</span>
          </NavLink>
        </div>
      </div>
      <div className="navbar-end">
        <figure className="image is-48x48">
          <img className="is-rounded" src={user.avatarURL} alt="User profile" />
        </figure>
        <div className="navbar-item">
          <span className="user-name">{user.name}</span>
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <button onClick={handleLogout} className="button is-light">
              LogOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

function mapStoreToProps({authedUser, users}) {
  return {
    user: users[authedUser],
  };
}

export default connect(mapStoreToProps, {setAuthedUser})(Header);
