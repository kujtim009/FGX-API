import axios from "axios";
import * as actionTypes from "../actions";
const getUserLicenseTypes = () => {
  return dispatch => {
    dispatch(startUserLicTypes());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/getuserprm?prmname=Lic_types", header)
      .then(res => {
        const tempLicTypes = [];
        for (let key in res.data.prm_value) {
          tempLicTypes.push({
            title: res.data.prm_value[key],
            id: key,
            Status: false
          });
        }
        dispatch(successUserLicTypes(tempLicTypes));
      })
      .catch(err => {
        dispatch(failedUserLicTypes(err.message));
      });
  };
};

const successUserLicTypes = data => ({
  type: actionTypes.SUCCESS_GETLICTYPES,
  payload: data
});

const startUserLicTypes = () => ({
  type: actionTypes.START_GETLICTYPES
});

const failedUserLicTypes = error => ({
  type: actionTypes.FAILD_GETLICTYPES,
  payload: {
    error
  }
});

export default getUserLicenseTypes;
