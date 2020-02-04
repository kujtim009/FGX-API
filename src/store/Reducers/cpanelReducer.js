import * as actionTypes from "../actions";

const initialState = {
  cpanelSpinner: false,
  registredUsers: [],
  layout: [],
  unAsignedColumns: [],
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
      const tempLayout = action.payload.map(item => ({
        LayoutField: item.LayoutField,
        FieldID: item.FieldID,
        ExportField: item.ExportField.replace(/ /g, "_")
          .replace(/-/g, "")
          .replace("/", "")
          .replace("__", "_")
          .trim(),
        ExportID: item.ExportID
      }));

      const unAsignedColumnsTemp = tempLayout.filter(layoutItem => {
        return state.asignedColumns.every(userItem => {
          return layoutItem.ExportField !== userItem.Field_name;
        });
      });
      return {
        ...state,
        cpanelSpinner: false,
        layout: tempLayout,
        unAsignedColumns: unAsignedColumnsTemp
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
      const updated = action.payload.map((item, indx) => {
        if ("LayoutField" in item) {
          console.log("checkFor:", item);
          return {
            ID: item.FieldID,
            View_state: 1,
            Field_name: item.ExportField,
            File_name: "MLF",
            User_id: state.selectedUserId,
            Order: indx
          };
        } else {
          return {
            ID: item.ID,
            View_state: item.View_state,
            Field_name: item.Field_name,
            File_name: item.File_name,
            User_id: item.User_id,
            Order: indx
          };
        }
      });
      return {
        ...state,
        asignedColumns: updated
      };
    case actionTypes.CHANGE_UNASIGNED_COLUMNS:
      const unAsignedUpdated = action.payload.map(firstItem => {
        if ("View_state" in firstItem) {
          const fieldDataToReturn = state.layout.filter(
            item => item.ExportField === firstItem.Field_name
          );
          return fieldDataToReturn[0];
        } else {
          return firstItem;
        }
      });
      return {
        ...state,
        unAsignedColumns: unAsignedUpdated
      };

    case actionTypes.SUCCESS_POST_COLUMN:
      return {
        ...state,
        cpanelSpinner: false,
        asignedColumns: action.payload
      };
    case actionTypes.START_POST_COLUMN:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_COLUMN:
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