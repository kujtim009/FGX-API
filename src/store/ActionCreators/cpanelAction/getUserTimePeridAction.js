import axios from "axios";
import * as actionTypes from "../../actions";
const getUserTimePeriodActionCreator = userID => {
  return dispatch => {
    dispatch(startGetTimePeriod());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/getusertimeperiod?uid=" + userID, header)
      .then(res => {
        if ("data" in res) {
          dispatch(successGetTimePeriod(res.data));
        } else {
          dispatch(
            successGetTimePeriod({
              CreatedDate: "",
              ExpirationDate: "",
              Dayes: ""
            })
          );
        }
      })
      .catch(err => {
        dispatch(failedGetTimePeriod(err.response));
      });
  };
};

const successGetTimePeriod = data => ({
  type: actionTypes.SUCCESS_GET_TIME_PERIOD,
  payload: data
});

const startGetTimePeriod = () => ({
  type: actionTypes.START_GET_TIME_PERIOD
});

const failedGetTimePeriod = error => ({
  type: actionTypes.FAILD_GET_TIME_PERIOD,
  payload: {
    error
  }
});

export default getUserTimePeriodActionCreator;
