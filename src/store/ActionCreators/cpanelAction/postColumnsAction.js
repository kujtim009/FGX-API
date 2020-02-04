import axios from "axios";
import * as actionTypes from "../../actions";

const postColumnsActionCreator = columns => {
  return dispatch => {
    dispatch(startPostColumns());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .post("/addUserFields", columns, header)
      .then(res => {
        dispatch(successPostColumns(res.data.Users));
      })
      .catch(err => {
        dispatch(failedPostColumns(err.response));
      });
  };
};

const successPostColumns = data => ({
  type: actionTypes.SUCCESS_POST_COLUMN,
  payload: data
});

const startPostColumns = () => ({
  type: actionTypes.START_POST_COLUMN
});

const failedPostColumns = error => ({
  type: actionTypes.FAILD_POST_COLUMN,
  payload: {
    error
  }
});

export default postColumnsActionCreator;
