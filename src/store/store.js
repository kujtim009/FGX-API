import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./Reducers/mainReducer";
import authReducer from "./Reducers/authReducer";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  mainReducer: mainReducer,
  authReducer: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
// const store = createStore(reducer, ["Use Redux"], applyMiddleware(thunk));
// const store = createStore(reducer);
export default store;
