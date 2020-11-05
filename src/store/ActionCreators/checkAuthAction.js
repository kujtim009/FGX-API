import axios from "axios";
import * as actionTypes from "../actions";
import getUserLicenseTypes from "./getLicenseTypesActions";
import getUserProjects from "./cbdActions/getProjectsActions";
import getUserColumnsActionCreator from "./columnAction";

const checkAuthActionCreator = () => {
  return (dispatch) => {
    dispatch(checkStartAction());
    const userId = localStorage.getItem("userid");
    const userName = localStorage.getItem("username");

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/checkauth/" + userId, header)
      .then((res) => {
        dispatch(checkSuccessAction({ ...res.data, userName: userName }));
        dispatch(getUserProjects());
        dispatch(getUserLicenseTypes());
        dispatch(getUserColumnsActionCreator());
      })
      .catch((err) => {
        localStorage.clear();

        dispatch(checkFailedAction(err.response));
      });
  };
};

const checkSuccessAction = (data) => ({
  type: actionTypes.SUCCESS_CHECK_AUTH,
  payload: {
    ...data,
  },
});

const checkStartAction = () => ({
  type: actionTypes.START_CHECK_AUTH,
});

const checkFailedAction = (error) => ({
  type: actionTypes.FAILD_CHECK_AUTH,
  payload: {
    error,
  },
});

export default checkAuthActionCreator;
