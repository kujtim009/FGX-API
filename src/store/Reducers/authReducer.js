import * as actionTypes from "../actions";

const initialState = {
  isAuthenticated: false,
  userName: null,
  userId: null,
  accessLevel: null,
  isAdmin: false,
  showSpinner: false,
  message: null,
  tokenExpired: false
};

const checkTokenExpiration = data => {
  console.log(
    data.error.data.error,
    "token_expired",
    data.error.data.error === "token_expired"
  );
  return data.error.data.error === "token_expired";
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
        isAdmin: action.payload.accessLevel === "1" ? true : false,
        showSpinner: false,
        tokenExpired: false
      };
    case actionTypes.START_LOGIN:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_LOGIN:
      return {
        ...state,
        showSpinner: false,
        isAuthenticated: false,
        message: action.payload.error.data.message
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
        isAdmin: action.payload.accessLevel === "1" ? true : false,
        showSpinner: false,
        tokenExpired: false
      };
    case actionTypes.START_CHECK_AUTH:
      return { ...state, showSpinner: true };

    case actionTypes.FAILD_CHECK_AUTH:
      return {
        ...state,
        showSpinner: false,
        isAuthenticated: false,
        tokenExpired: checkTokenExpiration(action.payload),
        message: action.payload.error.data.message
      };

    default:
      return state;
  }
};

export default reducer;
