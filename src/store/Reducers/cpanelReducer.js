import * as actionTypes from "../actions";

const initialState = {
  cpanelSpinner: false,
  registredUsers: [],
  layout: null,
  asignedColumns: null,
  selectedUserId: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GET_REGISTRED_USERS:
      return {
        ...state,
        cpanelSpinner: false,
        registredUsers: action.payload
      };
    case actionTypes.START_GET_REGISTRED_USERS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_REGISTRED_USERS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message
      };
    case actionTypes.CHANGE_REG_USER:
      return {
        ...state,
        selectedUserId: action.payload
      };

    case actionTypes.SUCCESS_USER_ASIGNED_COLUMNS:
      return {
        ...state,
        cpanelSpinner: false,
        asignedColumns: action.payload
      };
    case actionTypes.START_USER_ASIGNED_COLUMNS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_USER_ASIGNED_COLUMNS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message
      };

    case actionTypes.SUCCESS_GET_LAYOUT:
      return {
        ...state,
        cpanelSpinner: false,
        layout: action.payload
      };
    case actionTypes.START_GET_LAYOUT:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_LAYOUT:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message
      };
    default:
      return state;
  }
};

export default reducer;
