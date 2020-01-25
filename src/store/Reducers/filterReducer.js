import * as actionTypes from "../actions";

const initialState = {
  availableLicTypes: null,
  showSpinner: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GETLICTYPES:
      return {
        ...state,
        availableLicTypes: action.payload,
        showSpinner: false
      };
    case actionTypes.START_GETLICTYPES:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_GETLICTYPES:
      return {
        ...state,
        showSpinner: false,
        loginMessage: "Emri i përdoruesit ose fjalëkalimin i gabuar!"
      };
    case actionTypes.CHANGE_LICENSETYPE:
      return {
        ...state,
        showSpinner: false,
        availableLicTypes: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
