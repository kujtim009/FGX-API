import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import windowSize from "react-window-size";

import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import authRoutes from "../../../route";
import getUserLicenseTypes from "../../../store/ActionCreators/getLicenseTypesActions";
import checkAauthActionCreator from "../../../store/ActionCreators/checkAuthAction";

import "./app.scss";

class AdminLayout extends Component {
  componentWillUnmount() {
    document.removeEventListener(
      "fullscreenchange",
      this.fullScreenExitHandler
    );
    document.removeEventListener(
      "webkitfullscreenchange",
      this.fullScreenExitHandler
    );
    document.removeEventListener(
      "mozfullscreenchange",
      this.fullScreenExitHandler
    );
    document.removeEventListener(
      "MSFullscreenChange",
      this.fullScreenExitHandler
    );
  }

  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  };

  componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== "horizontal"
    ) {
      this.props.onComponentWillMount();
    }
  }
  componentDidMount() {
    // console.log("ADMIN LAYOUT: ", this.props.isAuthenticated);
    this.props.isAuthenticated
      ? this.props.getUserLicTypeAction()
      : this.props.checkAauthAction();
  }
  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    if (this.props.checkAuth) this.props.checkAauthAction();

    document.addEventListener("fullscreenchange", this.fullScreenExitHandler);
    document.addEventListener(
      "webkitfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener("MSFullscreenChange", this.fullScreenExitHandler);

    const menu = routes.map((route, index) => {
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

    return (
      <Aux>
        <Fullscreen enabled={this.props.isFullScreen}>
          <Navigation />
          <NavBar />
          <div
            className="pcoded-main-container"
            onClick={() => this.mobileOutClickHandler}>
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  {/* <Breadcrumb /> */}
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Switch>
                        {menu}
                        <Redirect from="/" to={this.props.defaultPath} />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    defaultPath: state.mainReducer.defaultPath,
    isFullScreen: state.mainReducer.isFullScreen,
    collapseMenu: state.mainReducer.collapseMenu,
    configBlock: state.mainReducer.configBlock,
    layout: state.mainReducer.layout,
    isAuthenticated: state.authReducer.isAuthenticated,
    checkAuth: state.filterReducer.checkAuth,
    availableLicTypes: state.filterReducer.availableLicTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    getUserLicTypeAction: () => dispatch(getUserLicenseTypes()),
    checkAauthAction: () => dispatch(checkAauthActionCreator())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
