import * as actionTypes from "../actions";

const initialState = {
  checkAuth: false,
  availableLicTypes: null,
  selectedLicenseTypes: "",
  availableProfessions: {},
  availableProfessionsBucket: {},
  availableProfessionsSubBucket: {},
  selectedProfession: "",
  selectedProfessionBucket: "",
  selectedProfessionSubBucket: "",
  selectedState: "all",
  showSpinner: false,
  message: null,
  showErrorMessage: false,
  otherFilters: {},
  loadDataTable: false,
  data: null,
  columns: null,
  queryPrm: null,
  loadProfessionDataTable: false,
  loadProfessionBucketDataTable: false,
  loadProfessionSubBucketDataTable: false,
  professionData: null,
  professionColumns: null,
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
    case actionTypes.SUCCESS_GETLICTYPES:
      return {
        ...state,
        checkAuth: false,
        availableLicTypes: action.payload,
        showSpinner: false,
      };
    case actionTypes.START_GETLICTYPES:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_GETLICTYPES:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        message: faildRequestMessage(action.payload),
        showErrorMessage: true,
      };

    case actionTypes.CHANGE_LICENSETYPE:
      return {
        ...state,
        availableLicTypes: action.payload.licenseTypes,
        selectedLicenseTypes: action.payload.selectedLicenseTypes,
        showCounter: false,
        loadDataTable: false,
      };
    case actionTypes.CHANGE_STATE:
      return {
        ...state,
        selectedState: action.payload,
        showCounter: false,
      };

    case actionTypes.SUCCESS_GETPROFESSIONS:
      return {
        ...state,
        checkAuth: false,
        availableProfessions: action.payload,
        loadProfessionDataTable: true,
        showSpinner: false,
      };
    case actionTypes.START_GETPROFESSIONS:
      return { ...state, showSpinner: true, loadProfessionDataTable: false };
    case actionTypes.FAILD_GETPROFESSIONS:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loadProfessionDataTable: false,
        loginMessage: faildRequestMessage(action.payload),
      };

    case actionTypes.SUCCESS_GETPROFESSIONS_BUCKETS:
      return {
        ...state,
        checkAuth: false,
        availableProfessionsBucket: action.payload,
        loadProfessionBucketDataTable: true,
        showSpinner: false,
      };
    case actionTypes.START_GETPROFESSIONS_BUCKETS:
      return {
        ...state,
        showSpinner: true,
        loadProfessionBucketDataTable: false,
      };
    case actionTypes.FAILD_GETPROFESSIONS_BUCKETS:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loadProfessionBucketDataTable: false,
        loginMessage: faildRequestMessage(action.payload),
      };
    case actionTypes.CHANGE_PROFESSION:
      return {
        ...state,
        selectedProfession: action.payload,
        showCounter: false,
      };

    case actionTypes.SUCCESS_GETPROFESSIONS_SUB_BUCKETS:
      return {
        ...state,
        checkAuth: false,
        availableProfessionsSubBucket: action.payload,
        loadProfessionSubBucketDataTable: true,
        showSpinner: false,
      };
    case actionTypes.START_GETPROFESSIONS_SUB_BUCKETS:
      return {
        ...state,
        showSpinner: true,
        loadProfessionSubBucketDataTable: false,
      };
    case actionTypes.FAILD_GETPROFESSIONS_SUB_BUCKETS:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loadProfessionSubBucketDataTable: false,
        loginMessage: faildRequestMessage(action.payload),
      };
    case actionTypes.CHANGE_PROFESSION_SUB_BUCKETS:
      return {
        ...state,
        selectedProfessionSubBucket: action.payload,
        showCounter: false,
      };

    case actionTypes.CHANGE_PROFESSION_BUCKETS:
      return {
        ...state,
        selectedProfessionBucket: action.payload,
        showCounter: false,
      };

    case actionTypes.CHANGE_OTHERFILTERS:
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload.inputValue,
        },
      };
    case actionTypes.CHANGE_COMBO_FILTERS:
      console.log({ [action.payload.inputName]: action.payload });
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload,
        },
      };

    case actionTypes.START_QUERY:
      return {
        ...state,
        parameters: null,
        checkAuth: false,
        showSpinner: true,
      };
    case actionTypes.SUCCESS_QUERY:
      console.log("FILTER REDUCER:", action.payload);
      return {
        ...state,
        checkAuth: false,
        showSpinner: false,
        data: action.payload.data,
        queryPrm: action.payload.queryPrm,
        loadProfessionDataTable: false,
        loadDataTable: true,
      };
    case actionTypes.FAILD_QUERY:
      return {
        ...state,
        showSpinner: false,
        checkAuth: true,
        loadDataTable: false,
        message: faildRequestMessage(action.payload),
        showErrorMessage: true,
      };

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
    default:
      return state;
  }
};

export default reducer;
