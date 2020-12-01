import axios from "axios";
import * as actionTypes from "../../actions";

const postAssignMaxDnld = (maxValue, userID) => {
  return (dispatch) => {
    dispatch(startPost());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    const postData = {
      prm_name: "maxDnld",
      prm_value: maxValue,
      prm_description: "Max Download per try!",
    };

    axios
      .post("/adduserprm?uid=" + userID, postData, header)
      .then((res) => {
        console.log(res);
        dispatch(successPost(res));
      })
      .catch((err) => {
        dispatch(failedPost(err.response));
      });
  };
};

const successPost = (data) => ({
  type: actionTypes.SUCCESS_POST_USER_MAX_DNLD,
  payload: data,
});

const startPost = () => ({
  type: actionTypes.START_POST_USER_MAX_DNLD,
});

const failedPost = (error) => ({
  type: actionTypes.FAILD_POST_USER_MAX_DNLD,
  payload: {
    error,
  },
});

export default postAssignMaxDnld;
