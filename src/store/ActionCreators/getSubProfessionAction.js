import axios from "axios";
import * as actionTypes from "../actions";

const getUserProfessionsSubBucket = (state, professionBucket) => {
  return (dispatch) => {
    dispatch(startUserProfessionsSubBucket());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let endpoint_bucket =
      state === "all"
        ? "/professions_subbuckets?professionBucket=" + professionBucket
        : "/professions_subbuckets?professionBucket=" +
          professionBucket +
          "&state=" +
          state;
    axios
      .get(endpoint_bucket, header)
      .then((res) => {
        dispatch(successUserProfessionsSubBucket(res.data));
      })
      .catch((err) => {
        dispatch(failedUserProfessionsSubBucket(err.response));
      });
  };
};

const successUserProfessionsSubBucket = (data) => ({
  type: actionTypes.SUCCESS_GETPROFESSIONS_SUB_BUCKETS,
  payload: data,
});

const startUserProfessionsSubBucket = () => ({
  type: actionTypes.START_GETPROFESSIONS_SUB_BUCKETS,
});

const failedUserProfessionsSubBucket = (error) => ({
  type: actionTypes.FAILD_GETPROFESSIONS_SUB_BUCKETS,
  payload: {
    error,
  },
});

export default getUserProfessionsSubBucket;
