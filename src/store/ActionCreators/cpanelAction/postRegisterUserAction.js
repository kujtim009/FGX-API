import axios from "axios";
import * as actionTypes from "../../actions";

const postRegisterUserActionCreator = userInfo => {
  return dispatch => {
    dispatch(startPostUserProf());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log("USER INFO: ", userInfo);
    const userData = {
      username: userInfo.username.value,
      password: userInfo.password.value,
      access_level: userInfo.userAccessType.value
    };
    axios
      .post("/register", userData, header)
      .then(res => {
        dispatch(successPostUserProf(res));
      })
      .catch(err => {
        dispatch(failedPostUserProf(err.response));
      });
  };
};

const successPostUserProf = data => ({
  type: actionTypes.SUCCESS_POST_REGISTER_USER,
  payload: data
});

const startPostUserProf = () => ({
  type: actionTypes.START_POST_REGISTER_USER
});

const failedPostUserProf = error => ({
  type: actionTypes.FAILD_POST_REGISTER_USER,
  payload: {
    error
  }
});

export default postRegisterUserActionCreator;
