import axios from "axios";
import * as actionTypes from "../actions";

const queryDownloadActionCreator = (parameters, activeProject) => {
  return (dispatch) => {
    dispatch(startQuery());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      responseType: "blob",
    };
    // console.log("QUERY DOWNLOAD ACTION: ACTIVE STATE", activeProject);
    const url =
      activeProject === "mlf"
        ? "/mlf_dnld?" + parameters
        : "/cbd_dnld?" + parameters;
    const fileName =
      activeProject === "mlf" ? "FGX_MLF_DATA.csv" : "FGX_CBD_DATA.csv";
    axios
      .get(url, header)
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch(successQuery());
      })
      .catch(() => {
        failedQuery("Something went wrong with the download!");
      });
  };
};

const successQuery = (file) => ({
  type: actionTypes.SUCCESS_DOWNLOAD_QUERY,
});

const startQuery = () => ({
  type: actionTypes.START_DOWNLOAD_QUERY,
});

const failedQuery = (error) => ({
  type: actionTypes.FAILD_DOWNLOAD_QUERY,
  payload: error,
});

export default queryDownloadActionCreator;
