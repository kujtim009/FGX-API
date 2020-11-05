import axios from "axios";
import * as actionTypes from "../actions";

const getUserColumnsActionCreator = (projects) => {
  return (dispatch) => {
    dispatch(startUserColumn());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const url =
      projects === "api" || projects === undefined
        ? "/usersField?project=MLF"
        : "/usersField?project=" + projects;
    // console.log("GET USER COLUMNS ACTION CREATOR:", url);
    axios
      .get(url, header)
      .then((res) => {
        const columns = res.data.User_fields.map((item) => {
          return {
            name: item.Field_name,
            selector: item.Field_name,
            sortable: true,
            allowOverflow: true,
          };
        });
        dispatch(successUserColumn(columns));
      })
      .catch((err) => {
        dispatch(failedUserColumn(err.response));
      });
  };
};

const successUserColumn = (data) => ({
  type: actionTypes.SUCCESS_USER_COLUMN,
  payload: data,
});

const startUserColumn = () => ({
  type: actionTypes.START_USER_COLUMN,
});

const failedUserColumn = (error) => ({
  type: actionTypes.FAILD_USER_COLUMN,
  payload: {
    error,
  },
});

export default getUserColumnsActionCreator;
