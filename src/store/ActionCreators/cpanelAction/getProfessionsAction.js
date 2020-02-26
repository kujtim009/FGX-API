import axios from "axios";
import * as actionTypes from "../../actions";

const isObject = o => {
  return o !== null && typeof o === "object" && Array.isArray(o) === false;
};

const getProfessionActionCreator = userID => {
  return dispatch => {
    dispatch(startGetProfessions());
    dispatch(startGetUserProfessions());
    const header = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    };

    axios
      .get("/professions", header)
      .then(res => {
        console.log("GET USER PROFESSION: ", res.data);
        const tempProfessions = Object.keys(res.data).map(item => ({
          title: item
        }));

        axios
          .get("/getuserprm?prmname=Professions&uid=" + userID, header)
          .then(res => {
            console.log("CPANEL USER ASIGNED PROFESSION:", res.data.prm_value);
            const tempUserProfessions = isObject(res.data.prm_value)
              ? res.data.prm_value.professions.split(",").map(item => ({
                  title: item
                }))
              : [];

            const unAsignedProfessions = tempProfessions.filter(profs =>
              tempUserProfessions.every(item => profs.title !== item.title)
            );

            dispatch(successGetProfessions(unAsignedProfessions));
            dispatch(successGetUserProfessions(tempUserProfessions));
          })
          .catch(err => {
            dispatch(failedGetUserProfessions(err.response));
          });
      })
      .catch(err => {
        dispatch(failedGetProfessions(err.response));
      });
  };
};

const successGetProfessions = data => ({
  type: actionTypes.SUCCESS_GET_PROFESSIONS,
  payload: data
});

const startGetProfessions = () => ({
  type: actionTypes.START_GET_PROFESSIONS
});

const failedGetProfessions = error => ({
  type: actionTypes.FAILD_GET_PROFESSIONS,
  payload: {
    error
  }
});

const successGetUserProfessions = data => ({
  type: actionTypes.SUCCESS_GET_USER_PROFESSIONS,
  payload: data
});

const startGetUserProfessions = () => ({
  type: actionTypes.START_GET_USER_PROFESSIONS
});

const failedGetUserProfessions = error => ({
  type: actionTypes.FAILD_GET_USER_PROFESSIONS,
  payload: {
    error
  }
});

export default getProfessionActionCreator;
