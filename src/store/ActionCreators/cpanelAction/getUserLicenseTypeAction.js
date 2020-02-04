import axios from "axios";
import * as actionTypes from "../actions";
const getAsignedUserLicTypeActionCreator = userID => {
  return dispatch => {
    dispatch(startUserLicTypes());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/getuserprm?prmname=Lic_types&uid=" + userID, header)
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
        dispatch(failedUserLicTypes(err.response));
      });
  };
};

const successUserLicTypes = data => ({
  type: actionTypes.SUCCESS_GET_USER_LIC_TYPES,
  payload: data
});

const startUserLicTypes = () => ({
  type: actionTypes.START_GET_USER_LIC_TYPES
});

const failedUserLicTypes = error => ({
  type: actionTypes.FAILD_GET_USER_LIC_TYPES,
  payload: {
    error
  }
});

export default getAsignedUserLicTypeActionCreator;
