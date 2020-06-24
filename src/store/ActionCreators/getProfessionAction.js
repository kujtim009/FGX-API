import axios from "axios";
import * as actionTypes from "../actions";

const getUserProfessions = (licenses, state) => {
  return (dispatch) => {
    dispatch(startUserProfessions());
    dispatch(startUserProfessionsBucket());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let endpoint =
      state === "all"
        ? "/professions?license_type=" + licenses
        : "/professions?license_type=" + licenses + "&state=" + state;
    axios
      .get(endpoint, header)
      .then((res) => {
        dispatch(successUserProfessions(res.data));
      })
      .catch((err) => {
        dispatch(failedUserProfessions(err.response));
      });

    let endpoint_bucket =
      state === "all"
        ? "/professions_buckets?license_type=" + licenses
        : "/professions_buckets?license_type=" + licenses + "&state=" + state;
    axios
      .get(endpoint_bucket, header)
      .then((res) => {
        dispatch(successUserProfessionsBucket(res.data));
      })
      .catch((err) => {
        dispatch(failedUserProfessionsBucket(err.response));
      });
  };
};

const successUserProfessions = (data) => ({
  type: actionTypes.SUCCESS_GETPROFESSIONS,
  payload: data,
});

const startUserProfessions = () => ({
  type: actionTypes.START_GETPROFESSIONS,
});

const failedUserProfessions = (error) => ({
  type: actionTypes.FAILD_GETPROFESSIONS,
  payload: {
    error,
  },
});

const successUserProfessionsBucket = (data) => ({
  type: actionTypes.SUCCESS_GETPROFESSIONS_BUCKETS,
  payload: data,
});

const startUserProfessionsBucket = () => ({
  type: actionTypes.START_GETPROFESSIONS_BUCKETS,
});

const failedUserProfessionsBucket = (error) => ({
  type: actionTypes.FAILD_GETPROFESSIONS_BUCKETS,
  payload: {
    error,
  },
});

export default getUserProfessions;
