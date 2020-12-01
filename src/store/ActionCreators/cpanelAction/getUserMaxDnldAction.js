import axios from "axios";
import * as actionTypes from "../../actions";
const getAsignedUserMaxDnldActionCreator = (userID) => {
  return (dispatch) => {
    dispatch(startGet());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/getuserprm?prmname=maxDnld&uid=" + userID, header)
      .then((res) => dispatch(successGet(res.data.prm_value)))
      .catch((err) => dispatch(failedGet(err.response)));
  };
};

const successGet = (data) => ({
  type: actionTypes.SUCCESS_GET_USER_MAXDNLD,
  payload: data,
});

const startGet = () => ({
  type: actionTypes.START_GET_USER_MAXDNLD,
});

const failedGet = (error) => ({
  type: actionTypes.FAILD_GET_USER_MAXDNLD,
  payload: {
    error,
  },
});

export default getAsignedUserMaxDnldActionCreator;
