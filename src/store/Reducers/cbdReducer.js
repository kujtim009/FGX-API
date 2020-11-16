import * as actionTypes from "../actions";

const initialState = {
  checkAuth: false,
  selectedState: "all",
  availableByerTypes: {
    "Potencial Byer": false,
    "Potencial Multi Byer": false,
    "Raw Phone": false,
    "Clean Phone": false,
    "Has Email": false,
  },
  citiesByState: [],
  selectedCity: null,
  zip: null,
  phone: null,
  dobFrom: null,
  dobTo: null,
  recordAdded: null,
  showSpinner: false,
  message: null,
  showErrorMessage: false,
  otherFilters: {},
  loadDataTable: false,
  data: null,
  columns: null,
  showCounter: false,
  showCounterSpinner: false,
  recordCount: null,
  downloadStatus: false,
  dnldData: null,
  dnldColumns: null,
  file: null,
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
    case actionTypes.CBD_CHANGE_STATE:
      return {
        ...state,
        selectedState: action.payload,
        showCounter: false,
      };

    case actionTypes.CBD_CHANGE_CITY:
      return {
        ...state,
        selectedCity: action.payload,
        showCounter: false,
      };

    case actionTypes.CHANGE_BYERTYPE:
      let tmpAvalByerType = {};
      action.payload.byerType.forEach((element) => {
        tmpAvalByerType[element[0]] = element[1];
      });

      return {
        ...state,
        availableByerTypes: tmpAvalByerType,
      };

    case actionTypes.CBD_CHANGE_OTHERFILTERS:
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload.inputValue,
        },
      };
    case actionTypes.CBD_CHANGE_DOB_FROM:
      return {
        ...state,
        dobFrom: action.payload,
      };

    case actionTypes.CBD_CHANGE_DOB_TO:
      return {
        ...state,
        dobTo: action.payload,
      };

    case actionTypes.CBD_CHANGE_RECORD_ADDED:
      return {
        ...state,
        recordAdded: action.payload,
      };

    case actionTypes.CHANGE_COMBO_FILTERS:
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload,
        },
      };

    // case actionTypes.START_QUERY:
    //   return {
    //     ...state,
    //     parameters: null,
    //     checkAuth: false,
    //     showSpinner: true,
    //   };
    // case actionTypes.SUCCESS_QUERY:
    //   return {
    //     ...state,
    //     checkAuth: false,
    //     showSpinner: false,
    //     data: action.payload.data,
    //     queryPrm: action.payload.queryPrm,
    //     loadProfessionDataTable: false,
    //     loadDataTable: true,
    //   };
    // case actionTypes.FAILD_QUERY:
    //   return {
    //     ...state,
    //     showSpinner: false,
    //     checkAuth: true,
    //     loadDataTable: false,
    //     message: faildRequestMessage(action.payload),
    //     showErrorMessage: true,
    //   };

    case actionTypes.START_COUNT_QUERY:
      return {
        ...state,
        checkAuth: false,
        showCounterSpinner: true,
      };
    case actionTypes.SUCCESS_COUNT_QUERY:
      return {
        ...state,
        showCounterSpinner: false,
        checkAuth: false,
        recordCount: action.payload,
        showCounter: true,
      };
    case actionTypes.FAILD_COUNT_QUERY:
      console.log(
        "MY MESSAGE:",
        faildRequestMessage(action.payload),
        "ERROR*:",
        action.payload
      );
      return {
        ...state,
        showCounterSpinner: false,
        checkAuth: true,
        message: faildRequestMessage(action.payload),
        showErrorMessage: true,
        showCounter: false,
      };

    case actionTypes.START_USER_COLUMN:
      return {
        ...state,
      };
    case actionTypes.SUCCESS_USER_COLUMN:
      return {
        ...state,
        columns: action.payload,
      };
    case actionTypes.FAILD_USER_COLUMN:
      return {
        ...state,
        message: action.payload,
        showErrorMessage: true,
      };

    case actionTypes.START_DOWNLOAD_QUERY:
      return {
        ...state,
        downloadStatus: true,
      };
    case actionTypes.SUCCESS_DOWNLOAD_QUERY:
      return {
        ...state,
        downloadStatus: false,
      };
    case actionTypes.FAILD_DOWNLOAD_QUERY:
      return {
        ...state,
        downloadStatus: false,
        message: action.payload,
        showErrorMessage: true,
      };
    case actionTypes.ON_ALERT_CLOSE:
      return {
        ...state,
        showErrorMessage: false,
      };

    case actionTypes.START_GET_CITY_BY_STATE:
      return {
        ...state,
        showSpinner: true,
      };
    case actionTypes.SUCCESS_GET_CITY_BY_STATE:
      return {
        ...state,
        citiesByState: action.payload,
        showSpinner: true,
      };
    case actionTypes.FAILD_GET_CITY_BY_STATE:
      return {
        ...state,
        downloshowSpinner: false,
        message: action.payload,
        showErrorMessage: true,
      };
    default:
      return state;
  }
};

export default reducer;
