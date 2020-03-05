import * as actionTypes from "../actions";

const initialState = {
  isAuthenticated: false,
  userName: null,
  userId: null,
  accessLevel: null,
  expiresIn: null,
  isAdmin: false,
  showSpinner: false,
  message: null,
  tokenExpired: false
};

const checkTokenExpiration = response => {
  if ("error" in response && response.error !== undefined) {
    if ("data" in response.error)
      return response.error.data.error === "token_expired";
  }
};

const faildRequestMessage = response => {
  if ("error" in response && response.error !== undefined) {
    if ("data" in response.error) return response.error.data.message;
  } else {
    return "Connection to the server is lost, please try again in a few seconds!";
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_LOGIN:
      return {
        ...state,
        userName: action.payload.username,
        userId: action.payload.userId,
        accessLevel: action.payload.accessLevel,
        expiresIn: action.payload.expiresIn,
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
        // message: action.payload.error.data.message
        message: faildRequestMessage(action.payload)
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
        expiresIn: action.payload.expiresIn,
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
        message: faildRequestMessage(action.payload)
      };

    default:
      return state;
  }
};

export default reducer;
