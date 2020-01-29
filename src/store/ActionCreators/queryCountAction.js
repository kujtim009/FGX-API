import axios from "axios";
import * as actionTypes from "../actions";

const runQueryCountActionCreator = parameters => {
  return dispatch => {
    dispatch(startCountQuery());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/mlf_count?" + parameters, header)
      .then(res => {
        console.log("RECORD COUNT: " + res.data.count);
        dispatch(successCountQuery(res.data.count));
      })
      .catch(err => {
        console.log("/mlf_countfilter?" + parameters);
        dispatch(failedCountQuery(err.response));
      });
  };
};

const successCountQuery = data => ({
  type: actionTypes.SUCCESS_COUNT_QUERY,
  payload: data
});

const startCountQuery = () => ({
  type: actionTypes.START_COUNT_QUERY
});

const failedCountQuery = error => ({
  type: actionTypes.FAILD_COUNT_QUERY,
  payload: {
    error
  }
});

export default runQueryCountActionCreator;
