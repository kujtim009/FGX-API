import axios from "axios";
import * as actionTypes from "../actions";

export const postLoginCall = (email, password) => {
  return dispatch => {
    dispatch(loginStartAction());
    const data = {
      username: email,
      password: password
    };

    axios
      .post("/auth", data)
      .then(res => {
        localStorage.clear();
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("username", email);
        localStorage.setItem("userid", res.data.userId);
        localStorage.setItem("accesslevel", res.data.accessLevel);
        console.log("RESPONSE: ", res);
        dispatch(loginSuccessAction({ ...res.data, username: email }));
      })
      .catch(err => {
        dispatch(loginFailedAction(err.response));
      });
  };
};

const loginSuccessAction = data => ({
  type: actionTypes.SUCCESS_LOGIN,
  payload: {
    ...data
  }
});

const loginStartAction = () => ({
  type: actionTypes.START_LOGIN
});

const loginFailedAction = error => ({
  type: actionTypes.FAILD_LOGIN,
  payload: {
    error
  }
});
