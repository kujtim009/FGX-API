import React, { Component } from "react";

class RegisterUser extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userAccessType: "",
    confirmPasswordStyle: {
      backgroundColor: "",
      confirm: true
    },
    ready: false
  };

  checkForConfPassword = () => {
    if (this.state.password === this.state.confirmPassword)
      this.setState({
        confirmPasswordStyle: {
          ...this.state.confirmPasswordStyle,
          backgroundColor: "",
          confirm: true
        }
      });
    else
      this.setState({
        confirmPasswordStyle: {
          ...this.state.confirmPasswordStyle,
          backgroundColor: "maroon",
          confirm: false
        }
      });
  };
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkIfFormIsReady = () => {
    if (
      this.state.username.length >= 3 &&
      this.validateEmail(this.state.email) &&
      this.state.confirmPasswordStyle.confirm &&
      this.state.userAccessType !== "0"
    )
      this.setState({
        ready: true
      });
    else
      this.setState({
        ready: false
      });
  };
  onChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    const timer = setTimeout(() => {
      this.checkForConfPassword();
      this.checkIfFormIsReady();
      console.log(this.state);
      clearTimeout(timer);
    }, 200);
  };

  render() {
    return (
      <div className="auth-content">
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <i className="feather icon-user-plus auth-icon" />
            </div>
            <h3 className="mb-4">Register</h3>
            <div className="input-group mb-3">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm password"
                style={this.state.confirmPasswordStyle}
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <select
                id="userAccessType"
                className="form-control"
                value={this.props.userAccessType}
                onChange={e => this.onChangeHandler(e)}>
                <option value="0">Select user access type</option>
                <option value="1">Administrator</option>
                <option value="2">User</option>
                <option value="3">Guest</option>
              </select>
            </div>
            <p>{this.props.message}</p>
            <button
              disabled={!this.state.ready}
              onClick={() => this.props.addUserAction(this.state)}
              className="btn btn-primary shadow-2 mb-4">
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
