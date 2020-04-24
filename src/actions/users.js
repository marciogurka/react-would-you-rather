import {showLoading, hideLoading} from "react-redux-loading";
import {_getUsers} from "../utils/_DATA";

export const RECEIVE_USERS = "RECEIVE_USERS";

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function handleGetUsers() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getUsers().then((users) => {
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}
