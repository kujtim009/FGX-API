import axios from "axios";
import * as actionTypes from "../../actions";
const getUserProjects = () => {
  return (dispatch) => {
    dispatch(startUserLicTypes());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/getuserprm?prmname=Projects", header)
      .then((res) => {
        const tempLicTypes = [];
        const licObject = res.data.prm_value;
        for (let key in licObject) {
          tempLicTypes.push({
            title: licObject[key],
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
  type: actionTypes.SUCCESS_GETPROJECTS,
  payload: data,
});

const startUserLicTypes = () => ({
  type: actionTypes.START_GETPROJECTS,
});

const failedUserLicTypes = (error) => ({
  type: actionTypes.FAILD_GETPROJECTS,
  payload: {
    error,
  },
});

export default getUserProjects;
