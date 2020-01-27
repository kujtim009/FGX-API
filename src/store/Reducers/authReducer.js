import * as actionTypes from "../actions";

const initialState = {
  isAuthenticated: false,
  userName: null,
  userId: null,
  accessLevel: null,
  showSpinner: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        userName: action.payload.username,
        userId: action.payload.userId,
        accessLevel: action.payload.accessLevel,
        isAuthenticated: true,
        showSpinner: false
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

    case actionTypes.SUCCESS_CHECK_AUTH:
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload.userId,
        accessLevel: action.payload.accessLevel,
        isAuthenticated: true,
        showSpinner: false
      };
    case actionTypes.START_CHECK_AUTH:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_CHECK_AUTH:
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