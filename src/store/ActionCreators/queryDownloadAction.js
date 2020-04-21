import axios from "axios";
import * as actionTypes from "../actions";

const queryDownloadActionCreator = parameters => {
  return dispatch => {
    dispatch(startQuery());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        pragma: "no-cache",
        "Cache-Control": "no-cache"
      },
      responseType: "blob"
    };

    // const method = "GET";

    const url = "/mlf_dnld?" + parameters;
    console.log(header);
    axios
      .get(url, header)
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "FGX_MLF_DATA.csv"); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch(successQuery());
      })
      .catch(err => {
        failedQuery(err.response);
      });
  };
};

const successQuery = file => ({
  type: actionTypes.SUCCESS_DOWNLOAD_QUERY
});

const startQuery = () => ({
  type: actionTypes.START_DOWNLOAD_QUERY
});

const failedQuery = error => ({
  type: actionTypes.FAILD_DOWNLOAD_QUERY,
  payload: {
    error
  }
});

export default queryDownloadActionCreator;
