import axios from "axios";

export const postLoginCall = (email, password) => {
  return dispatch => {
    dispatch(addTodoStarted());
    const data = {
      username: email,
      password: password
    };

    axios
      .post("/auth", data)
      .then(res => {
        localStorage.clear();
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("username", email);
        console.log("RESPONSE: ", res);
        dispatch(addTodoSuccess({ ...res.data, username: email }));
        //     axios
        //       .get("/shitja", {
        //         headers: { Authorization: "Token " + res.data.token }
        //       })
        //       .then(res => {
        //         // dispatch(checkSuccess());
        //         dispatch(addTodoSuccess({ ...res.data, username: email }));
        //       })
        //       .catch(err => {
        //         if (err.response.status === 401) {
        //           dispatch(checkFaild_401(err));
        //         } else {
        //           dispatch(checkFaild_403(err));
        //         }
        //       });
      })
      .catch(err => {
        dispatch(addTodoFailure(err.message));
      });
  };
};

const addTodoSuccess = data => ({
  type: "SUCCESS_LOGIN",
  payload: {
    ...data
  }
});

const addTodoStarted = () => ({
  type: "START_LOGIN"
});

const addTodoFailure = error => ({
  type: "FAILD_LOGIN",
  payload: {
    error
  }
});

export const checkAuthenticityAction = () => {
  console.log("CHECKING AUTHENTICITY");

  return dispatch => {
    dispatch(checkStart());

    const token = localStorage.getItem("token");
    axios
      .get("/shitja", { headers: { Authorization: "Token " + token } })
      .then(res => {
        dispatch(checkSuccess());
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          dispatch(checkFaild_401(err));
        } else {
          dispatch(checkFaild_403(err));
        }
      });
  };
};

const checkSuccess = () => ({
  type: "SUCCESS_CHECK"
});

const checkStart = () => ({
  type: "START_CHECK"
});

const checkFaild_401 = error => ({
  type: "FAILD_CHECK_401",
  payload: {
    error
  }
});

const checkFaild_403 = error => ({
  type: "FAILD_CHECK_403",
  payload: {
    error
  }
});
