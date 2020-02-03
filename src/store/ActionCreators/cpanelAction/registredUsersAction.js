import axios from "axios";
import * as actionTypes from "../../actions";

const getRegistredUsersActionCreator = () => {
  return dispatch => {
    dispatch(startRegistredUsers());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/users", header)
      .then(res => {
        dispatch(successRegistredUsers(res.data.Users));
      })
      .catch(err => {
        dispatch(failedRegistredUsers(err.response));
      });
  };
};

const successRegistredUsers = data => ({
  type: actionTypes.SUCCESS_GET_REGISTRED_USERS,
  payload: data
});

const startRegistredUsers = () => ({
  type: actionTypes.START_GET_REGISTRED_USERS
});

const failedRegistredUsers = error => ({
  type: actionTypes.FAILD_GET_REGISTRED_USERS,
  payload: {
    error
  }
});

export default getRegistredUsersActionCreator;
