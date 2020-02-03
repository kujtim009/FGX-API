import axios from "axios";
import * as actionTypes from "../../actions";

const getLayoutActionCreator = () => {
  return dispatch => {
    dispatch(startGetLayout());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/all_fields", header)
      .then(res => {
        dispatch(successGetLayout(res.data.Project_fields));
      })
      .catch(err => {
        dispatch(failedGetLayout(err.response));
      });
  };
};

const successGetLayout = data => ({
  type: actionTypes.SUCCESS_GET_LAYOUT,
  payload: data
});

const startGetLayout = () => ({
  type: actionTypes.START_GET_LAYOUT
});

const failedGetLayout = error => ({
  type: actionTypes.FAILD_GET_LAYOUT,
  payload: {
    error
  }
});

export default getLayoutActionCreator;
