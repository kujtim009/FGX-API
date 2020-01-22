import React, { Component } from "react";
// import NavIcon from "./../../../Navigation/NavContent/NavIcon";
// import NavBadge from "./../../NavContent/NavBadge";
// import { NavLink } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";

export default class LicenseType extends Component {
  state = {
    licenseNumber: null
  };

  componentDidUpdate() {
    console.log("Component did updatee: ", this.state);
  }
  onChangeHandler(event) {
    this.setState({
      licenseNumber: event.target.value
    });
  }
  render() {
    let compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="sm"
            type="text"
            placeholder="License Number"
            className="mb-3 dark"
            value={this.state.licenseNumber}
            onChange={e => this.onChangeHandler(e)}
          />
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
