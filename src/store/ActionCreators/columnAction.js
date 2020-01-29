import axios from "axios";
import * as actionTypes from "../actions";

const getUserColumnsActionCreator = () => {
  return dispatch => {
    dispatch(startUserColumn());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/usersField", header)
      .then(res => {
        const columns = res.data.User_fields.map(item => {
          return {
            name: item.Field_name,
            selector: item.Field_name,
            sortable: true,
            allowOverflow: true
          };
        });
        dispatch(successUserColumn(columns));
      })
      .catch(err => {
        dispatch(failedUserColumn(err.response));
      });
  };
};

const successUserColumn = data => ({
  type: actionTypes.SUCCESS_USER_COLUMN,
  payload: data
});

const startUserColumn = () => ({
  type: actionTypes.START_USER_COLUMN
});

const failedUserColumn = error => ({
  type: actionTypes.FAILD_USER_COLUMN,
  payload: {
    error
  }
});

export default getUserColumnsActionCreator;
