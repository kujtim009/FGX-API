import React from "react";
import ReactDOM from "react-dom";
// import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import reducer from "./store/reducer";
// import thunk from "redux-thunk";
import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import config from "./config";

// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, {}, composeEnhances(applyMiddleware(thunk)));
// const store = createStore(reducer, ["Use Redux"], applyMiddleware(thunk));
console.log(store);
// const store = createStore(reducer);
const app = (
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      {/* basename="/datta-able" */}
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
