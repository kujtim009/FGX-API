import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import authRoutes from "../route";
import AdminLayout from "./layout/AdminLayout";
import getUserLicenseTypes from "../store/ActionCreators/filterActions";
// const AdminLayout = Loadable({
//   loader: () => import("./layout/AdminLayout"),
//   loading: Loader
// });

class App extends Component {
  checkLocalToken() {
    return localStorage.getItem("token") ? true : false;
  }
  componentDidMount() {
    console.log("APP COMPONENT DID MOUNT");
  }
  render() {
    const menu = authRoutes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      ) : null;
    });
    const mainRedirect =
      this.props.isAuthenticated || this.checkLocalToken() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect
          to={authRoutes.filter(item => item.name === "Signin")[0].path}
        />
      );

    let routeGuard =
      this.props.isAuthenticated || this.checkLocalToken() ? (
        <Route path="/" component={AdminLayout} />
      ) : (
        [...menu]
      );

    return (
      <Aux>
        <ScrollToTop>
          {mainRedirect}
          <Switch>{routeGuard}</Switch>
        </ScrollToTop>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default connect(mapStateToProps)(App);
