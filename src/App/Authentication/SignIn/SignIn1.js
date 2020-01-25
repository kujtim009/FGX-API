import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { postLoginCall } from "../../../store/ActionCreators/authAction";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import authRoutes from "../../../route";
// import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

class SignUp1 extends React.Component {
  state = { email: "fgxapiuser", password: "Firmagraphix1" };
  componentDidMount() {}
  componentDidUpdate() {}
  onLoginHandler = () => {
    this.props.onAuthHandler(this.state.email, this.state.password);
  };
  onInputChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    let redirect = this.props.isAuthenticated ? (
      <Redirect
        key="rdr"
        to={authRoutes.filter(item => item.name === "Signin")[0].path}
      />
    ) : null;
    return (
      <Aux>
        {/* <Breadcrumb /> */}
        {redirect}
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.onInputChangeHandler}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={this.onInputChangeHandler}
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Save credentials
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary shadow-2 mb-4"
                  onClick={this.onLoginHandler}>
                  Login
                </button>
                <p className="mb-2 text-muted">
                  Forgot password?{" "}
                  <NavLink to="/auth/reset-password-1">Reset</NavLink>
                </p>
                <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <NavLink to="/auth/signup-1">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthHandler: (email, password) => {
      //   console.log("BUTTON CLICKED");
      dispatch(postLoginCall(email, password));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);
