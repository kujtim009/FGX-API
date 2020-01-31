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

class App extends Component {
  checkLocalToken() {
    return localStorage.getItem("token") ? true : false;
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

    let mainRedirect = null;
    let routeGuard = null;

    if (this.props.isAuthenticated || this.checkLocalToken()) {
      if (!this.props.tokenExpired) {
        routeGuard = <Route path="/" component={AdminLayout} />;
        // mainRedirect = <Redirect to="/" />;
      } else {
        console.log(
          "IS AUTHENTICATED:",
          this.props.isAuthenticated,
          "LOCAL STORAGE TOKEN: ",
          this.checkLocalToken(),
          "TOKEN EXPIRED2: ",
          this.props.tokenExpired
        );
        routeGuard = [...menu];
        mainRedirect = (
          <Redirect
            to={authRoutes.filter(item => item.name === "Signin")[0].path}
          />
        );
      }
    } else {
      routeGuard = [...menu];
      mainRedirect = (
        <Redirect
          to={authRoutes.filter(item => item.name === "Signin")[0].path}
        />
      );
    }

    return (
      <Aux>
        <ScrollToTop>
          <Switch>{routeGuard}</Switch>
          {mainRedirect}
        </ScrollToTop>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    tokenExpired: state.authReducer.tokenExpired
  };
};

export default connect(mapStateToProps)(App);
