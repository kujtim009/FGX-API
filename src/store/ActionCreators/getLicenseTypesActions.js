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
        const licObject = res.data.prm_value;
        console.log("LICENSE TYPES", licObject);
        for (let key in licObject) {
          tempLicTypes.push({
            title: licObject[key],
            id: key,
            Status: false
          });
        }
        dispatch(successUserLicTypes(tempLicTypes));
      })
      .catch(err => {
        dispatch(failedUserLicTypes(err.response));
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
