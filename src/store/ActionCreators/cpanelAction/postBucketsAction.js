import axios from "axios";
import * as actionTypes from "../../actions";

const postBucketsActionCreator = (professions, userID) => {
  return (dispatch) => {
    dispatch(startPostUserBuckets());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(professions);

    const postLicData = {
      prm_name: "ProfessionBuckets",
      prm_value: {
        professions: professions.map((item) => item.title).join(","),
      },
      prm_description: "Professions Buckets allowed for user",
    };
    console.log("GENERATEOD POST: ", postLicData);

    console.log("GENERATEOD POST TO JSON: ", JSON.stringify(postLicData));
    axios
      .post("/adduserprm?uid=" + userID, postLicData, header)
      .then((res) => {
        console.log(res);
        dispatch(successPostUserBuckets(res));
      })
      .catch((err) => {
        dispatch(failedPostUserBuckets(err.response));
      });
  };
};

const successPostUserBuckets = (data) => ({
  type: actionTypes.SUCCESS_POST_USER_BUCKETS,
  payload: data,
});

const startPostUserBuckets = () => ({
  type: actionTypes.START_POST_USER_BUCKETS,
});

const failedPostUserBuckets = (error) => ({
  type: actionTypes.FAILD_POST_USER_BUCKETS,
  payload: {
    error,
  },
});

export default postBucketsActionCreator;
