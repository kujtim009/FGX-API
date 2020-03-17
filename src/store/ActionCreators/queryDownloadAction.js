import axios from "axios";
import * as actionTypes from "../actions";

const queryDownloadActionCreator = parameters => {
  return dispatch => {
    dispatch(startQuery());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/mlf_dnld?" + parameters, header)
      .then(res => {
        dispatch(successQuery());
      })
      .catch(err => {
        dispatch(failedQuery(err.response));
      });
  };
};

const successQuery = () => ({
  type: actionTypes.SUCCESS_DOWNLOAD_QUERY
});

const startQuery = () => ({
  type: actionTypes.START_DOWNLOAD_QUERY
});

const failedQuery = error => ({
  type: actionTypes.FAILD_DOWNLOAD_QUERY,
  payload: {
    error
  }
});

export default queryDownloadActionCreator;
