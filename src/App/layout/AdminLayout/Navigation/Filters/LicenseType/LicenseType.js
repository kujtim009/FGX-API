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
    licenseType: [
      { title: "Proffesional", id: "plf", Status: true },
      { title: "Occupational", id: "ocl", Status: false },
      { title: "Liquor", id: "liq", Status: false },
      { title: "Business", id: "blf", Status: false }
    ]
  };

  componentDidUpdate() {
    console.log("Component did updatee: ", this.state.licenseType);
  }
  onCheckboxCheckHandler(event) {
    console.log(event);
    console.log(event.target.id);
    console.log(this.state.licenseType);
    const tempLicTypes = this.state.licenseType.map(item => {
      if (event.target.id === item.id) {
        return { title: item.title, id: item.id, Status: event.target.checked };
      } else {
        return item;
      }
    });

    this.setState({
      licenseType: tempLicTypes
    });
  }
  render() {
    const licType = this.state.licenseType.map((item, index) => (
      <Form.Check
        custom
        key={index}
        type="checkbox"
        id={item.id}
        label={item.title}
        checked={item.Status}
        onChange={e => this.onCheckboxCheckHandler(e)}
      />
    ));
    let compBody = (
      <div className="nav-link">
        <Form.Group>{licType}</Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
