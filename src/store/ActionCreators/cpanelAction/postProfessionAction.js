import axios from "axios";
import * as actionTypes from "../../actions";

const postProfessionActionCreator = (professions, userID) => {
  return dispatch => {
    dispatch(startPostUserProf());

    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };
    console.log(professions);

    const postLicData = {
      prm_name: "Professions",
      prm_value: { profession: professions.map(item => item.title).join(",") },
      prm_description: "Professions allowed for user"
    };
    console.log("GENERATEOD POST: ", postLicData);

    console.log("GENERATEOD POST TO JSON: ", JSON.stringify(postLicData));
    axios
      .post("/adduserprm?uid=" + userID, postLicData, header)
      .then(res => {
        console.log(res);
        dispatch(successPostUserProf(res));
      })
      .catch(err => {
        dispatch(failedPostUserProf(err.response));
      });
  };
};

const successPostUserProf = data => ({
  type: actionTypes.SUCCESS_POST_USER_PROFESSION,
  payload: data
});

const startPostUserProf = () => ({
  type: actionTypes.START_POST_USER_PROFESSION
});

const failedPostUserProf = error => ({
  type: actionTypes.FAILD_POST_USER_PROFESSION,
  payload: {
    error
  }
});

export default postProfessionActionCreator;
