import axios from "axios";
import * as actionTypes from "../../actions";

const postColumnsActionCreator = (columns, userID) => {
  return dispatch => {
    dispatch(startPostColumns());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .post("/removeallfields/" + userID, null, header)
      .then(() => {
        const columnsToPost = columns.map(item => ({
          User_id: parseInt(item.User_id),
          View_state: item.View_state,
          File_name: item.File_name,
          Field_name: item.Field_name,
          Order: item.Order
        }));
        console.log("COLUMS:", columnsToPost);
        axios
          .post("/addUserFields", columnsToPost, header)
          .then(res => {
            console.log("SUCCESS:", columnsToPost);
            dispatch(successPostColumns(res));
          })
          .catch(err => {
            console.log("ERRORR:", columnsToPost);
            dispatch(failedPostColumns(err.response));
          });
      })
      .catch(err => {
        dispatch(failedPostColumns(err.response));
      });
  };
};

const successPostColumns = data => ({
  type: actionTypes.SUCCESS_POST_COLUMN,
  payload: data
});

const startPostColumns = () => ({
  type: actionTypes.START_POST_COLUMN
});

const failedPostColumns = error => ({
  type: actionTypes.FAILD_POST_COLUMN,
  payload: {
    error
  }
});

export default postColumnsActionCreator;
