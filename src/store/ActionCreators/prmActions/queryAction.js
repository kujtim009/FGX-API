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
  if (
    data.selectedState !== "" &&
    data.selectedState !== null &&
    data.selectedState !== "all"
  )
    prm.push("&state=" + data.selectedState);

  // if (data.selectedState !== "") prm.push("&state=" + data.selectedState);
  // if (
  //   data.selectedZip !== "" &&
  //   data.selectedZip !== null &&
  //   data.selectedZip !== "all"
  // )
  //   prm.push("&city=" + data.selectedZip);
  if (
    data.selectedZip !== "" &&
    data.selectedZip !== null &&
    data.selectedZip !== "all"
  )
    prm.push("&zip=" + data.selectedZip);
  if (
    data.selectedStatus !== "" &&
    data.selectedStatus !== null &&
    data.selectedStatus !== "all"
  )
    prm.push("&status=" + data.selectedStatus);

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
  selectedZip,
  selectedStatus,
  otherFilters
) => {
  return (dispatch) => {
    dispatch(startQuery());
    const rawQueryData = {
      selectedState: selectedState,
      selectedZip: selectedZip,
      selectedStatus: selectedStatus,
      otherFilters: otherFilters,
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
      .get("/prm_filter?" + parameters, header)
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
