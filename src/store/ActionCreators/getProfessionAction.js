import axios from "axios";
import * as actionTypes from "../actions";

const getUserProfessions = (licenses, state) => {
  return dispatch => {
    dispatch(startUserProfessions());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    let endpoint =
      state === "all"
        ? "/professions?license_type=" + licenses
        : "/professions?license_type=" + licenses + "&state=" + state;
    console.log("GET PROFESION ENDPOINT: ", endpoint);
    axios
      .get(endpoint, header)
      .then(res => {
        dispatch(successUserProfessions(res.data));
      })
      .catch(err => {
        dispatch(failedUserProfessions(err.message));
      });
  };
};

const successUserProfessions = data => ({
  type: actionTypes.SUCCESS_GETPROFESSIONS,
  payload: data
});

const startUserProfessions = () => ({
  type: actionTypes.START_GETPROFESSIONS
});

const failedUserProfessions = error => ({
  type: actionTypes.FAILD_GETPROFESSIONS,
  payload: {
    error
  }
});

export default getUserProfessions;
