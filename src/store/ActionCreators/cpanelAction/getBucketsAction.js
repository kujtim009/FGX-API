import axios from "axios";
import * as actionTypes from "../../actions";

const isObject = (o) => {
  return o !== null && typeof o === "object" && Array.isArray(o) === false;
};

const getBucketsActionCreator = (userID) => {
  return (dispatch) => {
    dispatch(startGetBuckets());
    dispatch(startGetUserBuckets());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/professions_buckets", header)
      .then((res) => {
        console.log("GET USER BUCKETS: ", res.data);
        const tempBuckets = Object.keys(res.data).map((item) => ({
          title: item,
        }));

        axios
          .get("/getuserprm?prmname=ProfessionBuckets&uid=" + userID, header)
          .then((res) => {
            console.log("CPANEL USER ASIGNED BUCKETS:", res.data.prm_value);
            const tempUserBuckets = isObject(res.data.prm_value)
              ? res.data.prm_value.professions.split(",").map((item) => ({
                  title: item,
                }))
              : [];

            const unAsignedBuckets = tempBuckets.filter((profs) =>
              tempUserBuckets.every((item) => profs.title !== item.title)
            );

            dispatch(successGetBuckets(unAsignedBuckets));
            dispatch(successGetUserBuckets(tempUserBuckets));
          })
          .catch((err) => {
            dispatch(failedGetUserBuckets(err.response));
          });
      })
      .catch((err) => {
        dispatch(failedGetProfessions(err.response));
      });
  };
};

const successGetBuckets = (data) => ({
  type: actionTypes.SUCCESS_GET_BUCKETS,
  payload: data,
});

const startGetBuckets = () => ({
  type: actionTypes.START_GET_BUCKETS,
});

const failedGetProfessions = (error) => ({
  type: actionTypes.FAILD_GET_BUCKETS,
  payload: {
    error,
  },
});

const successGetUserBuckets = (data) => ({
  type: actionTypes.SUCCESS_GET_USER_BUCKETS,
  payload: data,
});

const startGetUserBuckets = () => ({
  type: actionTypes.START_GET_USER_BUCKETS,
});

const failedGetUserBuckets = (error) => ({
  type: actionTypes.FAILD_GET_USER_BUCKETS,
  payload: {
    error,
  },
});

export default getBucketsActionCreator;
