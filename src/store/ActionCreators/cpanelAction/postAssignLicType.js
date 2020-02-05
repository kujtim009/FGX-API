import axios from "axios";
import * as actionTypes from "../../actions";

const postAsignLicType = (licenses, userID) => {
  return dispatch => {
    dispatch(startPostUserLic());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log(licenses);
    // licensesObj.update({ [item.id]: item.title }
    let licensesObj = {};
    licenses.forEach(
      item => (licensesObj = { ...licensesObj, [item.id]: item.title })
    );
    const postLicData = {
      prm_name: "Lic_types",
      prm_value: licensesObj,
      prm_description: "License types allowed for user"
    };
    console.log("GENERATEOD POST: ", postLicData);

    console.log("GENERATEOD POST TO JSON: ", JSON.stringify(postLicData));
    axios
      .post("/adduserprm?uid=" + userID, postLicData, header)
      .then(res => {
        console.log(res);
        dispatch(successPostUserLic(res));
      })
      .catch(err => {
        dispatch(failedPostUserLic(err.response));
      });
  };
};

const successPostUserLic = data => ({
  type: actionTypes.SUCCESS_POST_USER_LIC_TYPES,
  payload: data
});

const startPostUserLic = () => ({
  type: actionTypes.START_POST_USER_LIC_TYPES
});

const failedPostUserLic = error => ({
  type: actionTypes.FAILD_POST_USER_LIC_TYPES,
  payload: {
    error
  }
});

export default postAsignLicType;
