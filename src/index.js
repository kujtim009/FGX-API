import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import config from "./config";
import axios from "axios";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  width: "600px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

// axios.defaults.baseURL = "https://firmagraphix-api.com";
axios.defaults.baseURL = "http://127.0.0.1:5000";
const app = (
  // <Provider store={store}>
  //   <BrowserRouter basename={config.basename}>
  //     {/* basename="/datta-able" */}
  //     <AlertProvider template={AlertTemplate} {...options}>
  //       <App />
  //     </AlertProvider>
  //   </BrowserRouter>
  // </Provider>
  <Provider store={store}>
    <HashRouter basename={config.basename}>
      {/* basename="/datta-able" */}
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
