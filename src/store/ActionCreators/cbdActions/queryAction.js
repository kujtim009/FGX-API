import axios from "axios";
import * as actionTypes from "../../actions";
import runQueryCountActionCreator from "./queryCountAction";

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}

const paramCreator = (data) => {
  let prm = [];
  if (data.selectedState !== "") prm.push("&state=" + data.selectedState);
  if (
    data.selectedCity !== "" &&
    data.selectedCity !== null &&
    data.selectedCity !== "all"
  )
    prm.push("&city=" + data.selectedCity);
  if (data.dobFrom !== null) prm.push("&dob_from=" + data.dobFrom);
  if (data.dobTo !== null) prm.push("&dob_to=" + data.dobTo);
  if (data.recordAdded !== null) prm.push("&record_added=" + data.recordAdded);

  if (data.availableByerTypes["Potencial Byer"] === true)
    prm.push("&p_buyer=Y");
  if (data.availableByerTypes["Potencial Multi Byer"] === true)
    prm.push("&p_multi_buyer=Y");
  if (data.availableByerTypes["Raw Phone"] === true) prm.push("&raw_phone=Y");
  if (data.availableByerTypes["Clean Phone"] === true)
    prm.push("&clean_phone=Y");
  if (data.availableByerTypes["Has Email"] === true) prm.push("&has_email=Y");

  Object.keys(data.otherFilters).forEach((key) => {
    if (isObject(data.otherFilters[key])) {
      const srchType =
        key === "licowner"
          ? "&lic_owner=" +
            data.otherFilters[key].inputValue +
            "&srch_type_licO=" +
            data.otherFilters[key].selectedValue
          : "&company_name=" +
            data.otherFilters[key].inputValue +
            "&srch_type_comp=" +
            data.otherFilters[key].selectedValue;
      prm.push(srchType);
    } else {
      if (data.otherFilters[key] !== "")
        prm.push("&" + key + "=" + data.otherFilters[key]);
    }
  });
  return prm.join("").substring(1, prm.join("").length);
};

const runQueryActionCreator = (
  selectedState,
  availableByerTypes,
  selectedCity,
  otherFilters,
  dobFrom,
  dobTo,
  recordAdded
) => {
  return (dispatch) => {
    dispatch(startQuery());
    const rawQueryData = {
      selectedState: selectedState,
      availableByerTypes: availableByerTypes,
      selectedCity: selectedCity,
      otherFilters: otherFilters,
      dobFrom: dobFrom,
      dobTo: dobTo,
      recordAdded: recordAdded,
    };
    const parameters = paramCreator(rawQueryData);

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    dispatch(runQueryCountActionCreator(parameters));
    console.log("CBD PARAMETERS", parameters);
    axios
      .get("/cbd_filter?" + parameters, header)
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
