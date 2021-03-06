import axios from "axios";
import * as actionTypes from "../../actions";
import getLayoutActionCreator from "./getLayoutAction";

const getAsignedUserColumnsActionCreator = userId => {
  return dispatch => {
    dispatch(startUserColumn());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/usersField?uid=" + userId, header)
      .then(res => {
        dispatch(successUserColumn(res.data.User_fields));
        dispatch(getLayoutActionCreator());
      })
      .catch(err => {
        dispatch(failedUserColumn(err.response));
      });
  };
};

const successUserColumn = data => ({
  type: actionTypes.SUCCESS_USER_ASIGNED_COLUMNS,
  payload: data
});

const startUserColumn = () => ({
  type: actionTypes.START_USER_ASIGNED_COLUMNS
});

const failedUserColumn = error => ({
  type: actionTypes.FAILD_USER_ASIGNED_COLUMNS,
  payload: {
    error
  }
});

export default getAsignedUserColumnsActionCreator;
