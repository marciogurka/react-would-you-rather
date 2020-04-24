import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import {handleGetUsers} from "../actions/users";
import {LoadingBar} from "react-redux-loading";

const LoginPage = (props) => {
  const {loading, users, handleGetUsers, setAuthedUser} = props;
  const [user, setUser] = useState(undefined);

  const handleUserSelect = (e) => {
    const user = e.target.value;
    setUser(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthedUser(user);
  };

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <>
      <LoadingBar />
      {!loading && (
        <div className="container login-page">
          <div className="column box is-half is-offset-one-quarter">
            <h3 className="is-size-3 has-text-grey-light has-text-centered">
              Would you rather?
            </h3>
            <form className="hero is-primary" onSubmit={handleSubmit}>
              <div className="field">
                <p className="control has-icons-left">
                  <span className="select is-large">
                    <select
                      name="user"
                      onChange={handleUserSelect}
                      value={user}
                    >
                      <option value="">Select an user</option>
                      {Object.keys(users).map((id) => (
                        <option key={id} value={id}>
                          {users[id].name}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span className="icon is-large is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </p>
              </div>
              <button
                className="button is-dark is-medium"
                disabled={user ? false : true}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

function mapStateToProps({users}) {
  return {
    loading: Object.keys(users).length === 0,
    users,
  };
}

export default connect(mapStateToProps, {setAuthedUser, handleGetUsers})(
  LoginPage
);
