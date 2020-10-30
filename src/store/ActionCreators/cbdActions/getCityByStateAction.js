import axios from "axios";
import * as actionTypes from "../../actions";

const getUserProfessions = (state) => {
  return (dispatch) => {
    dispatch(startGetCityByState());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let endpoint = "/cbd_city_by_state?state=" + state;

    axios
      .get(endpoint, header)
      .then((res) => {
        dispatch(successGetCityByState(res.data));
      })
      .catch((err) => {
        dispatch(failedGetCityByState(err.response));
      });
  };
};

const successGetCityByState = (data) => ({
  type: actionTypes.SUCCESS_GET_CITY_BY_STATE,
  payload: data["cities"],
});

const startGetCityByState = () => ({
  type: actionTypes.START_GET_CITY_BY_STATE,
});

const failedGetCityByState = (error) => ({
  type: actionTypes.FAILD_GET_CITY_BY_STATE,
  payload: {
    error,
  },
});

export default getUserProfessions;
