import axios from "axios";
import * as actionTypes from "../../actions";
const getAsignedUserProjectsActionCreator = (userID) => {
  return (dispatch) => {
    dispatch(startUserLicTypes());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/getuserprm?prmname=Projects&uid=" + userID, header)
      .then((res) => {
        const tempLicTypes = [];
        for (let key in res.data.prm_value) {
          tempLicTypes.push({
            title: res.data.prm_value[key],
            id: key,
            Status: false,
          });
        }
        dispatch(successUserLicTypes(tempLicTypes));
      })
      .catch((err) => {
        dispatch(failedUserLicTypes(err.response));
      });
  };
};

const successUserLicTypes = (data) => ({
  type: actionTypes.SUCCESS_GET_USER_PROJECTS,
  payload: data,
});

const startUserLicTypes = () => ({
  type: actionTypes.START_GET_USER_PROJECTS,
});

const failedUserLicTypes = (error) => ({
  type: actionTypes.FAILD_GET_USER_PROJECTS,
  payload: {
    error,
  },
});

export default getAsignedUserProjectsActionCreator;
