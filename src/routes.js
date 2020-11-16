import React from "react";
import $ from "jquery";

import DashboardDefault from "./App/components/Dashboard";
import Cpanel from "./App/components/Cpanel";

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const routes = [
  {
    path: "/dashboard",
    exact: false,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/cpanel",
    exact: true,
    name: "CPanel",
    component: Cpanel,
  },
];

export default routes;
