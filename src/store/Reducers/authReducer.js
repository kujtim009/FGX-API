import * as actionTypes from "../actions";

const initialState = {
  isAuthenticated: false,
  userName: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.username,
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
    case actionTypes.SUCCESS_LOGOUT:
      return {
        ...state,
        showSpinner: false,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default reducer;
