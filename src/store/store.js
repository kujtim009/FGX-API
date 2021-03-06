import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./Reducers/mainReducer";
import authReducer from "./Reducers/authReducer";
import filterReducer from "./Reducers/filterReducer";
import cpanelReducer from "./Reducers/cpanelReducer";
import cbdReducer from "./Reducers/cbdReducer";
import prmReducer from "./Reducers/prmReducer";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  mainReducer: mainReducer,
  authReducer: authReducer,
  filterReducer: filterReducer,
  cpanelReducer: cpanelReducer,
  cbdReducer: cbdReducer,
  prmReducer: prmReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
export default store;
