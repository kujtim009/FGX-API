import * as actionTypes from "../actions";

const initialState = {
  availableLicTypes: null,
  selectedLicenseTypes: "",
  availableProfessions: null,
  selectedProfession: "",
  selectedState: "all",
  showSpinner: false,
  otherFilters: {}
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
        availableProfessions: action.payload,
        showSpinner: false
      };
    case actionTypes.START_GETPROFESSIONS:
      return { ...state, showSpinner: true };
    case actionTypes.FAILD_GETPROFESSIONS:
      return {
        ...state,
        showSpinner: false,
        loginMessage: "Emri i përdoruesit ose fjalëkalimin i gabuar!"
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
      return {
        ...state,
        otherFilters: {
          ...state.otherFilters,
          [action.payload.inputName]: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
