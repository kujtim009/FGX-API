import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { connect } from "react-redux";
import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import authRoutes from "../route";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader
});

class App extends Component {
  render() {
    console.log("APP>JS RENDERING");
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
    let routesMain = null;
    if (!this.props.isAuthenticated) {
      routesMain = menu;
      routesMain.push(
        <Redirect
          key="rdr"
          to={authRoutes.filter(item => item.name === "Signin")[0].path}
        />
      );
    } else {
      routesMain = <Route path="/" component={AdminLayout} />;
    }
    console.log("APP>JS", routesMain);
    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {/* {menu}

              <Route path="/" component={AdminLayout} /> */}
              {routesMain}
            </Switch>
          </Suspense>
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
