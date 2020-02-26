import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import config from "./config";
import axios from "axios";

// axios.defaults.baseURL = "https://firmagraphix-api.com";
axios.defaults.baseURL = "http://127.0.0.1:5000";
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
