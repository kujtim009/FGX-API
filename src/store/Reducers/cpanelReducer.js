import * as actionTypes from "../actions";

const initialState = {
  cpanelSpinner: false,
  registredUsers: [],
  layout: [],
  unAsignedColumns: [],
  asignedColumns: [],
  selectedUserId: "",
  userAsignedLicenseTypes: [],
  userAsignedProjects: [],
  userMaxDnld: null,
  unAsignedProfessions: [],
  asignedProfessions: [],

  unAsignedBuckets: [],
  asignedBuckets: [],

  timePeriodCreatedDate: "",
  timePeriodExpirationDate: "",
  timePeriodDayes: "",
  message: "",
  showErrorMessage: false,
  positiveMessage: false,
};

const faildRequestMessage = (response) => {
  if ("error" in response && response.error !== undefined) {
    if ("data" in response.error) return response.error.data.message;
  } else {
    return "Connection to the server is lost, please try again in a few seconds!";
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GET_REGISTRED_USERS:
      return {
        ...state,
        cpanelSpinner: false,
        registredUsers: action.payload,
      };
    case actionTypes.START_GET_REGISTRED_USERS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_REGISTRED_USERS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.SUCCESS_GET_USER_MAXDNLD:
      return {
        ...state,
        cpanelSpinner: false,
        userMaxDnld: action.payload,
      };
    case actionTypes.START_GET_USER_MAXDNLD:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_USER_MAXDNLD:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };
    case actionTypes.CHANGE_USER_MAXDNLD:
      return {
        ...state,
        userMaxDnld: action.payload,
      };
    case actionTypes.SUCCESS_POST_USER_MAX_DNLD:
      return {
        ...state,
        checkAuth: true,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Your changes have been saved successfully!",
        positiveMessage: true,
      };
    case actionTypes.START_POST_USER_MAX_DNLD:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_USER_MAX_DNLD:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Error!",
        positiveMessage: false,
        // message: action.payload.error.data.message
      };
    case actionTypes.CHANGE_REG_USER:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case actionTypes.SUCCESS_USER_ASIGNED_COLUMNS:
      return {
        ...state,
        cpanelSpinner: false,
        asignedColumns: action.payload,
      };
    case actionTypes.START_USER_ASIGNED_COLUMNS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_USER_ASIGNED_COLUMNS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.SUCCESS_GET_LAYOUT:
      const tempLayout = action.payload.map((item) => ({
        LayoutField: item.LayoutField,
        FieldID: item.FieldID,
        ExportField: item.ExportField.replace(/ /g, "_")
          .replace(/-/g, "")
          .replace("/", "")
          .replace("__", "_")
          .trim(),
        ExportID: item.ExportID,
      }));

      const unAsignedColumnsTemp = tempLayout.filter((layoutItem) => {
        return state.asignedColumns.every((userItem) => {
          return layoutItem.ExportField !== userItem.Field_name;
        });
      });
      return {
        ...state,
        cpanelSpinner: false,
        layout: tempLayout,
        unAsignedColumns: unAsignedColumnsTemp,
      };
    case actionTypes.START_GET_LAYOUT:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_LAYOUT:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };
    case actionTypes.CHANGE_USER_ASIGNED_COLUMNS:
      const updated = action.payload.map((item, indx) => {
        if ("LayoutField" in item) {
          return {
            ID: item.FieldID,
            View_state: 1,
            Field_name: item.ExportField,
            File_name: "MLF",
            User_id: state.selectedUserId,
            Order: indx,
          };
        } else {
          return {
            ID: item.ID,
            View_state: item.View_state,
            Field_name: item.Field_name,
            File_name: item.File_name,
            User_id: item.User_id,
            Order: indx,
          };
        }
      });
      return {
        ...state,
        asignedColumns: updated,
      };
    case actionTypes.CHANGE_UNASIGNED_COLUMNS:
      const unAsignedUpdated = action.payload.map((firstItem) => {
        if ("View_state" in firstItem) {
          const fieldDataToReturn = state.layout.filter(
            (item) => item.ExportField === firstItem.Field_name
          );
          return fieldDataToReturn[0];
        } else {
          return firstItem;
        }
      });
      return {
        ...state,
        unAsignedColumns: unAsignedUpdated,
      };

    case actionTypes.SUCCESS_POST_COLUMN:
      return {
        ...state,
        checkAuth: true,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Your changes have been saved successfully!",
        positiveMessage: true,
      };
    case actionTypes.START_POST_COLUMN:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_COLUMN:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Error!",
        positiveMessage: false,
        // message: action.payload.error.data.message
      };
    case actionTypes.SUCCESS_GET_USER_LIC_TYPES:
      return {
        ...state,
        cpanelSpinner: false,
        userAsignedLicenseTypes: action.payload,
      };
    case actionTypes.START_GET_USER_LIC_TYPES:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_USER_LIC_TYPES:
      return {
        ...state,
        cpanelSpinner: false,
        // message: action.payload.error.data.message
      };
    case actionTypes.CHANGE_USER_LIC_TYPE:
      console.log("CHANGED LIC TYPES:", action.payload);
      return {
        ...state,
        cpanelSpinner: false,
        userAsignedLicenseTypes: action.payload,
      };

    case actionTypes.SUCCESS_POST_USER_LIC_TYPES:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Your changes have been saved successfully!",
        positiveMessage: true,
      };
    case actionTypes.START_POST_USER_LIC_TYPES:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_USER_LIC_TYPES:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Error!",
        positiveMessage: false,
        // message: action.payload.error.data.message
      };

    case actionTypes.SUCCESS_GET_USER_PROJECTS:
      return {
        ...state,
        cpanelSpinner: false,
        userAsignedProjects: action.payload,
      };
    case actionTypes.START_GET_USER_PROJECTS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_USER_PROJECTS:
      return {
        ...state,
        cpanelSpinner: false,
        // message: action.payload.error.data.message
      };
    case actionTypes.CHANGE_USER_PROJECTS:
      console.log("CHANGED LIC TYPES:", action.payload);
      return {
        ...state,
        cpanelSpinner: false,
        userAsignedProjects: action.payload,
      };

    case actionTypes.SUCCESS_POST_USER_PROJECTS:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Your changes have been saved successfully!",
        positiveMessage: true,
      };
    case actionTypes.START_POST_USER_PROJECTS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_USER_PROJECTS:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        message: "Error!",
        positiveMessage: false,
        // message: action.payload.error.data.message
      };

    case actionTypes.SUCCESS_GET_PROFESSIONS:
      return {
        ...state,
        cpanelSpinner: false,
        unAsignedProfessions: action.payload,
      };
    case actionTypes.START_GET_PROFESSIONS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_PROFESSIONS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.SUCCESS_GET_USER_PROFESSIONS:
      return {
        ...state,
        cpanelSpinner: false,
        asignedProfessions: action.payload,
      };
    case actionTypes.START_GET_USER_PROFESSIONS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_USER_PROFESSIONS:
      console.log(action.payload);
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.CHANGE_UNASIGNED_PROFESSIONS:
      console.log("CPANEL REDUCER: ", action.payload);
      const tempUnasignedProf = state.unAsignedProfessions.filter((item) =>
        action.payload.every((someItem) => item.title !== someItem.title)
      );

      return {
        ...state,
        unAsignedProfessions: tempUnasignedProf,
        asignedProfessions: [...state.asignedProfessions, ...action.payload],
      };
    case actionTypes.CHANGE_USER_ASIGNED_PROFESSIONS:
      const tempAsignedProf = state.asignedProfessions.filter((item) =>
        action.payload.every((someItem) => item.title !== someItem.title)
      );
      return {
        ...state,
        unAsignedProfessions: [
          ...state.unAsignedProfessions,
          ...action.payload,
        ],
        asignedProfessions: tempAsignedProf,
      };
    /////////////////////BUCKETS/////////////////////////////////////////////////////
    case actionTypes.SUCCESS_GET_BUCKETS:
      return {
        ...state,
        cpanelSpinner: false,
        unAsignedBuckets: action.payload,
      };
    case actionTypes.START_GET_BUCKETS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_BUCKETS:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.SUCCESS_GET_USER_BUCKETS:
      return {
        ...state,
        cpanelSpinner: false,
        asignedBuckets: action.payload,
      };
    case actionTypes.START_GET_USER_BUCKETS:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_GET_USER_BUCKETS:
      console.log(action.payload);
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.CHANGE_UNASIGNED_BUCKETS:
      console.log("CPANEL REDUCER: ", action.payload);
      const tempUnasignedBuck = state.unAsignedBuckets.filter((item) =>
        action.payload.every((someItem) => item.title !== someItem.title)
      );

      return {
        ...state,
        unAsignedBuckets: tempUnasignedBuck,
        asignedBuckets: [...state.asignedBuckets, ...action.payload],
      };
    case actionTypes.CHANGE_USER_ASIGNED_BUCKETS:
      const tempAsignedBuck = state.asignedBuckets.filter((item) =>
        action.payload.every((someItem) => item.title !== someItem.title)
      );
      return {
        ...state,
        unAsignedBuckets: [...state.unAsignedBuckets, ...action.payload],
        asignedBuckets: tempAsignedBuck,
      };
    ///////////////////////////////////////////////////////////////////////////////
    case actionTypes.SUCCESS_POST_REGISTER_USER:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        positiveMessage: true,
        message: action.payload.data.message,
      };
    case actionTypes.SUCCESS_POST_USER_PROFESSION:
      return {
        ...state,
        showErrorMessage: true,
        message: "Your changes have been saved successfully!",
        positiveMessage: true,
      };

    case actionTypes.START_POST_REGISTER_USER:
      return { ...state, cpanelSpinner: true };
    case actionTypes.FAILD_POST_REGISTER_USER:
      return {
        ...state,
        cpanelSpinner: false,
        message: action.payload.error.data.message,
      };

    case actionTypes.SUCCESS_GET_TIME_PERIOD:
      return {
        ...state,
        cpanelSpinner: false,
        timePeriodCreatedDate: action.payload.CreatedDate,
        timePeriodExpirationDate: action.payload.ExpirationDate,
        timePeriodDayes: action.payload.Dayes,
      };
    case actionTypes.START_GET_TIME_PERIOD:
      return { ...state, cpanelSpinner: true, message: "" };
    case actionTypes.FAILD_GET_TIME_PERIOD:
      return {
        ...state,
        cpanelSpinner: false,
        timePeriodCreatedDate: "",
        timePeriodExpirationDate: "",
        timePeriodDayes: "",
        message: action.payload.error.data.message,
      };
    case actionTypes.CHANGE_TIME_PERIOD:
      return {
        ...state,
        cpanelSpinner: false,
        timePeriodCreatedDate:
          "createdDate" in action.payload
            ? action.payload.createdDate
            : state.timePeriodCreatedDate,
        timePeriodExpirationDate:
          "expirationData" in action.payload
            ? action.payload.expirationData
            : state.timePeriodExpirationDate,
        timePeriodDayes: !isNaN(action.payload.timePeriodDayes)
          ? action.payload.timePeriodDayes
          : "",
      };
    case actionTypes.SUCCESS_POST_TIME_PERIOD:
      return {
        ...state,
        cpanelSpinner: false,
        showErrorMessage: true,
        positiveMessage: true,
        message: action.payload.data.message,
      };
    case actionTypes.START_POST_TIME_PERIOD:
      return { ...state, cpanelSpinner: true, message: "" };
    case actionTypes.FAILD_POST_TIME_PERIOD:
      return {
        ...state,
        cpanelSpinner: false,
        timePeriodCreatedDate: "",
        timePeriodExpirationDate: "",
        timePeriodDayes: "",
        message: action.payload.error.data.message,
      };
    case actionTypes.ON_ALERT_CLOSE:
      return {
        ...state,
        showErrorMessage: false,
        message: "",
      };
    default:
      return state;
  }
};

export default reducer;
