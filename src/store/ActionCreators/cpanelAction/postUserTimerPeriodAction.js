import axios from "axios";
import * as actionTypes from "../../actions";

const postTimePeriodActionCreator = (userID, createdDate, expiratinDate) => {
  return dispatch => {
    dispatch(startPostUserProf());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log("USER INFO: ", userID);
    const userData = {
      CreateDate: createdDate,
      ExpirationDate: expiratinDate
    };
    axios
      .post("/addusertimeperiod?uid=" + userID, userData, header)
      .then(res => {
        dispatch(successPostUserProf(res));
      })
      .catch(err => {
        dispatch(failedPostUserProf(err.response));
      });
  };
};

const successPostUserProf = data => ({
  type: actionTypes.SUCCESS_POST_TIME_PERIOD,
  payload: data
});

const startPostUserProf = () => ({
  type: actionTypes.START_POST_TIME_PERIOD
});

const failedPostUserProf = error => ({
  type: actionTypes.FAILD_POST_TIME_PERIOD,
  payload: {
    error
  }
});

export default postTimePeriodActionCreator;
