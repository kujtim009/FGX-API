import React from "react";
import SignUp1 from "./App/Authentication/SignUp/SignUp1";
import Signin1 from "./App/Authentication/SignIn/SignIn1";
// const SignUp1 = React.lazy(() => import("./App/Authentication/SignUp/SignUp1"));
// const Signin1 = React.lazy(() => import("./App/Authentication/SignIn/SignIn1"));

const route = [
  { path: "/auth/signup", exact: true, name: "Signup", component: SignUp1 },
  { path: "/auth/signin", exact: true, name: "Signin", component: Signin1 }
];

export default route;
