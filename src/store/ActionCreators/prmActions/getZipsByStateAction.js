import axios from "axios";
import * as actionTypes from "../../actions";

const getZipsByState = (state) => {
  return (dispatch) => {
    dispatch(startGetZipByState());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let endpoint = "/prm_zip_by_state?state=" + state;
    console.log(
      "GET ZIP BY STATE ACTION: ",
      "/prm_zip_by_state?state=" + state
    );
    axios
      .get(endpoint, header)
      .then((res) => {
        const zipsData = res.data.zip.map((item, index) => ({
          id: item,
          name: item,
        }));
        console.log("ZIP DATA: ", zipsData);
        dispatch(successGetZipByState(zipsData));
      })
      .catch((err) => {
        dispatch(failedGetZipByState(err.response));
      });
  };
};

const successGetZipByState = (data) => ({
  type: actionTypes.SUCCESS_GET_ZIP_BY_STATE,
  payload: data,
  // payload: data["zip"],
});

const startGetZipByState = () => ({
  type: actionTypes.START_GET_ZIP_BY_STATE,
});

const failedGetZipByState = (error) => ({
  type: actionTypes.FAILD_GET_ZIP_BY_STATE,
  payload: {
    error,
  },
});

export default getZipsByState;
