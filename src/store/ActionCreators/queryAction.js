import axios from "axios";
import * as actionTypes from "../actions";
import runQueryCountActionCreator from "./queryCountAction";

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}

const paramCreator = (data) => {
  let prm = [];
  if (data.licenseType !== "") prm.push("&license_type=" + data.licenseType);
  if (data.state !== "") prm.push("&state=" + data.state);
  if (data.profession !== "") prm.push("&profession=" + data.profession);

  Object.keys(data.other).forEach((key) => {
    if (isObject(data.other[key])) {
      const srchType =
        key === "licowner"
          ? "&lic_owner=" +
            data.other[key].inputValue +
            "&srch_type_licO=" +
            data.other[key].selectedValue
          : "&company_name=" +
            data.other[key].inputValue +
            "&srch_type_comp=" +
            data.other[key].selectedValue;
      prm.push(srchType);
    } else {
      prm.push("&" + key + "=" + data.other[key]);
    }
  });
  return prm.join("").substring(1, prm.join("").length);
};

const runQueryActionCreator = (
  selectedLicenseTypes,
  selectedProfession,
  selectedState,
  otherFilters
) => {
  return (dispatch) => {
    dispatch(startQuery());
    const rawQueryData = {
      licenseType: selectedLicenseTypes,
      profession: selectedProfession,
      state: selectedState,
      other: otherFilters,
    };
    const parameters = paramCreator(rawQueryData);

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    dispatch(runQueryCountActionCreator(parameters));
    console.log("PARAMETERS", parameters);
    axios
      .get("/mlf_filter?" + parameters, header)
      .then((res) => {
        dispatch(successQuery(res.data.Records[0], parameters));
      })
      .catch((err) => {
        dispatch(failedQuery(err));
      });
  };
};

const successQuery = (data, prm) => ({
  type: actionTypes.SUCCESS_QUERY,
  payload: { data: data, queryPrm: prm },
});

const startQuery = () => ({
  type: actionTypes.START_QUERY,
});

const failedQuery = (error) => ({
  type: actionTypes.FAILD_QUERY,
  payload: error,
});

export default runQueryActionCreator;
