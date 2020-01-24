import * as actionTypes from "../actions";

const initialState = {
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  console.log("REDUCER: ", action);

  switch (action.type) {
    case actionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        isAuthenticated: true,
        showspinner: false
      };
    case actionTypes.START_LOGIN:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_LOGIN:
      return {
        ...state,
        showSpinner: false,
        isAuthenticated: false,
        loginMessage: "Emri i përdoruesit ose fjalëkalimin i gabuar!"
      };

    default:
      return state;
  }
};

export default reducer;
