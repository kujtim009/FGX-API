import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhances(applyMiddleware(thunk)));
// const store = createStore(reducer, ["Use Redux"], applyMiddleware(thunk));
export default store;
