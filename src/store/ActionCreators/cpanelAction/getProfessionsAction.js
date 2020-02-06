import axios from "axios";
import * as actionTypes from "../../actions";

const getProfessionAction = () => {
  return dispatch => {
    dispatch(startGetProfessions());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/professions", header)
      .then(res => {
        dispatch(successGetProfessions(res.data.Project_fields));
      })
      .catch(err => {
        dispatch(failedGetProfessions(err.response));
      });
  };
};

const successGetProfessions = data => ({
  type: actionTypes.SUCCESS_GET_PROFESSIONS,
  payload: data
});

const startGetProfessions = () => ({
  type: actionTypes.START_GET_PROFESSIONS
});

const failedGetProfessions = error => ({
  type: actionTypes.FAILD_GET_PROFESSIONS,
  payload: {
    error
  }
});

export default getProfessionAction;
