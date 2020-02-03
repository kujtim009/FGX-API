import * as actionTypes from "../actions";

const initialState = {
  cpanelSpinner: false,
  registredUsers: [],
  layout: [],
  asignedColumns: [],
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
    case actionTypes.CHANGE_USER_ASIGNED_COLUMNS:
      console.log(actionTypes.CHANGE_USER_ASIGNED_COLUMNS, action.payload);
      const updated = action.payload.map(item => {
        if ("LayoutField" in item) {
          return {
            ID: item.fieldID,
            View_state: 1,
            Field_name: item.LayoutField,
            File_name: "MLF",
            User_id: state.selectedUserId,
            Order: 0
          };
        }
      });
      return {
        ...state,
        asignedColumns: updated
      };
    default:
      return state;
  }
};

export default reducer;
