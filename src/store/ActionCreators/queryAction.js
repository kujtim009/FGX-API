import axios from "axios";
import * as actionTypes from "../actions";

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}

const paramCreator = data => {
  let prm = [];
  if (data.licenseType !== "") prm.push("&license_type=" + data.licenseType);
  if (data.state !== "") prm.push("&state=" + data.state);
  if (data.profession !== "") prm.push("&profession=" + data.profession);

  Object.keys(data.other).forEach(key => {
    if (isObject(data.other[key])) {
      const srchType =
        key === "licOwnerName"
          ? "&" +
            key +
            "=" +
            data.other[key].inputValue +
            "&srch_type_licO=" +
            data.other[key].selectedValue
          : "&" +
            key +
            "=" +
            data.other[key].inputValue +
            "&srch_type_comp=" +
            data.other[key].selectedValue;
      prm.push(srchType);
    } else {
      prm.push("&" + key + "=" + data.other[key]);
    }
  });
  return prm.join("");
};

const runQueryActionCreator = (
  selectedLicenseTypes,
  selectedProfession,
  selectedState,
  otherFilters
) => {
  return dispatch => {
    dispatch(startQuery());
    // console.log(
    //   "selectedLicenseTypes:",
    //   selectedLicenseTypes,
    //   "selectedProfession:",
    //   selectedProfession,
    //   "selectedState:",
    //   selectedState,
    //   "otherFilters:",
    //   otherFilters
    // );
    const rawQueryData = {
      licenseType: selectedLicenseTypes,
      profession: selectedProfession,
      state: selectedState,
      other: otherFilters
    };
    const parameters = paramCreator(rawQueryData);

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/mlf_filter?" + parameters, header)
      .then(res => {
        console.log("/mlf_filter?" + parameters);
        dispatch(successQuery(res.data.Records[0]));
      })
      .catch(err => {
        console.log("/mlf_filter?" + parameters);
        dispatch(failedQuery(err.response));
      });
  };
};

const successQuery = data => ({
  type: actionTypes.SUCCESS_QUERY,
  payload: data
});

const startQuery = () => ({
  type: actionTypes.START_QUERY
});

const failedQuery = error => ({
  type: actionTypes.FAILD_QUERY,
  payload: {
    error
  }
});

export default runQueryActionCreator;
