import * as actionTypes from "../actions";

const initialState = {
  checkAuth: false,
  availableLicTypes: null,
  selectedLicenseTypes: "",
  availableProfessions: null,
  selectedProfession: "",
  selectedState: "all",
  showSpinner: false,
  message: null,
  otherFilters: {},
  loadDataTable: false,
  data: null,
  columns: null,
  showCounter: false,
  showCounterSpinner: false,
  recordCount: null
};

// const getSelectedLicTypesToString = licTypes => {
//   console.log("REDUCER CHANGE LICENSE: ", licTypes);
//   return licTypes
//     .filter(item => {
//       return item.Status === true;
//     })
//     .map(item => item.id)
//     .join();
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESS_GETLICTYPES:
      return {
        ...state,
        checkAuth: false,
        availableLicTypes: action.payload,
        showSpinner: false
      };
    case actionTypes.START_GETLICTYPES:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_GETLICTYPES:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        message: action.payload.error.data.message
      };

    case actionTypes.CHANGE_LICENSETYPE:
      return {
        ...state,
        availableLicTypes: action.payload.licenseTypes,
        selectedLicenseTypes: action.payload.selectedLicenseTypes
      };
    case actionTypes.CHANGE_STATE:
      return {
        ...state,
        selectedState: action.payload
      };

    case actionTypes.SUCCESS_GETPROFESSIONS:
      return {
        ...state,
        checkAuth: false,
        availableProfessions: action.payload,
        showSpinner: false
      };
    case actionTypes.START_GETPROFESSIONS:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_GETPROFESSIONS:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loginMessage: action.payload.error.data.message
      };

    case actionTypes.CHANGE_PROFESSION:
      return {
        ...state,
        selectedProfession: action.payload
      };

    case actionTypes.CHANGE_OTHERFILTERS:
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload.inputValue
        }
      };
    case actionTypes.CHANGE_COMBO_FILTERS:
      console.log({ [action.payload.inputName]: action.payload });
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload
        }
      };

    case actionTypes.START_QUERY:
      return {
        ...state,
        checkAuth: false,
        showSpinner: true
      };
    case actionTypes.SUCCESS_QUERY:
      return {
        ...state,
        checkAuth: false,
        showSpinner: false,
        data: action.payload,
        loadDataTable: true
      };
    case actionTypes.FAILD_QUERY:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loadDataTable: false,
        message: action.payload
      };

    case actionTypes.START_COUNT_QUERY:
      return {
        ...state,
        checkAuth: false,
        showCounterSpinner: true
      };
    case actionTypes.SUCCESS_COUNT_QUERY:
      return {
        ...state,
        showCounterSpinner: false,
        checkAuth: false,
        recordCount: action.payload,
        showCounter: true
      };
    case actionTypes.FAILD_COUNT_QUERY:
      return {
        ...state,
        showCounterSpinner: false,
        checkAuth: true,
        message: action.payload,
        showCounter: false
      };

    case actionTypes.START_USER_COLUMN:
      return {
        ...state
      };
    case actionTypes.SUCCESS_USER_COLUMN:
      return {
        ...state,
        columns: action.payload
      };
    case actionTypes.FAILD_USER_COLUMN:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
