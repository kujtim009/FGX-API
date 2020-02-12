import React, { Component } from "react";

class RegisterUser extends Component {
  state = {
    username: {
      value: "",
      valid: false,
      rules: {
        length: 3
      },
      style: {
        color: "",
        backgroundColor: ""
      }
    },
    email: {
      value: "",
      valid: false,
      rules: {
        length: 6,
        isEmail: true
      },
      style: {
        color: "",
        backgroundColor: ""
      }
    },
    password: {
      value: "1",
      valid: false,
      rules: {
        length: 6,
        validatePassword: true
      },
      style: {
        color: "",
        backgroundColor: ""
      }
    },
    confirmPassword: {
      value: "",
      valid: false,
      rules: {
        length: 6,
        validateConfirmPassword: true
      },
      style: {
        color: "",
        backgroundColor: ""
      }
    },
    userAccessType: {
      value: "",
      valid: false,
      rules: {
        selectionRequired: true
      },
      style: {
        color: "",
        backgroundColor: ""
      }
    },
    ready: false
  };
  isObject = o => {
    return o !== null && typeof o === "object" && Array.isArray(o) === false;
  };

  checkIfFormIsReady = () => {
    if (
      Object.keys(this.state)
        .filter(field => this.isObject(this.state[field]))
        .every(item => this.state[item].valid === true)
    )
      this.setState({
        ready: true
      });
    else
      this.setState({
        ready: false
      });
  };

  validateConfirmPassword = id => {
    if (this.state[id].value === this.state.password.value)
      this.setState({
        [id]: {
          ...this.state[id],
          valid: true,
          style: { color: "white", backgroundColor: "#FFFF33" }
        }
      });
    else
      this.setState({
        [id]: {
          ...this.state[id],
          valid: false,
          style: { color: "", backgroundColor: "" }
        }
      });
  };

  isEmail = id => {
    if (this.validateEmail(this.state[id].value))
      this.setState({
        [id]: {
          ...this.state[id],
          valid: true,
          style: { color: "white", backgroundColor: "#FFFF33" }
        }
      });
    else
      this.setState({
        [id]: {
          ...this.state[id],
          valid: false,
          style: { color: "", backgroundColor: "" }
        }
      });
  };

  selectionRequired = id => {
    if (this.state[id].value !== "")
      this.setState({
        [id]: {
          ...this.state[id],
          valid: true,
          style: { color: "white", backgroundColor: "#FFFF33" }
        }
      });
    else
      this.setState({
        [id]: {
          ...this.state[id],
          valid: false,
          style: { color: "", backgroundColor: "" }
        }
      });
  };

  checkLengthRule = id => {
    console.log("CHECKING THE RULE OF LENGTH");
    if (this.state[id].value.length >= this.state[id].rules.length)
      this.setState({
        [id]: {
          ...this.state[id],
          valid: true,
          style: { color: "white", backgroundColor: "#FFFF33" }
        }
      });
    else
      this.setState({
        [id]: {
          ...this.state[id],
          valid: false,
          style: { color: "", backgroundColor: "" }
        }
      });
  };
  validatePassword = id => {
    if (this.checkPassword(this.state[id].value))
      this.setState({
        [id]: {
          ...this.state[id],
          valid: true,
          style: { color: "white", backgroundColor: "#FFFF33" }
        }
      });
    else
      this.setState({
        [id]: {
          ...this.state[id],
          valid: false,
          style: { color: "", backgroundColor: "" }
        }
      });
  };
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  checkPassword(password) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal)) return true;
    else return false;
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
    });
    const id = e.target.id;

    const timer = setTimeout(() => {
      Object.keys(this.state[id].rules).forEach(item => {
        switch (item) {
          case "length":
            this.checkLengthRule(id);
            break;
          case "selectionRequired":
            this.selectionRequired(id);
            break;
          case "isEmail":
            this.isEmail(id);
            break;
          case "validatePassword":
            this.validatePassword(id);
            break;
          case "validateConfirmPassword":
            this.validateConfirmPassword(id);
            break;

          default:
            break;
        }
      });

      this.checkIfFormIsReady();
      console.log(this.state);
      clearTimeout(timer);
    }, 200);
  }

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
                value={this.state.username.value}
                className="form-control"
                placeholder="Username"
                style={this.state.username.style}
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                id="email"
                type="email"
                value={this.state.email.value}
                className="form-control"
                placeholder="Email"
                style={this.state.email.style}
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <input
                id="password"
                type="password"
                value={this.state.password.value}
                autoComplete="off"
                className="form-control"
                placeholder="Password"
                style={this.state.password.style}
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <input
                id="confirmPassword"
                type="password"
                value={this.state.confirmPassword.value}
                className="form-control"
                placeholder="Confirm password"
                style={this.state.confirmPassword.style}
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <div className="input-group mb-4">
              <select
                id="userAccessType"
                className="form-control"
                value={this.state.userAccessType.value}
                style={this.state.userAccessType.style}
                onChange={e => this.onChangeHandler(e)}>
                <option value="">Select user access type</option>
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
