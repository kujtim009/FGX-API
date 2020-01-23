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

class CostumEditBox extends Component {
  state = {
    inputName: null,
    inputValue: ""
  };

  componentDidUpdate() {
    // console.log("Component did updatee: ", this.state);
  }
  onChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
      inputName: event.target.id
    });
  }
  render() {
    let compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="sm"
            id={this.props.item.id}
            type="text"
            placeholder={this.props.item.title}
            className="mb-3 dark"
            value={this.state.inputValue}
            onChange={e => this.onChangeHandler(e)}
          />
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

export default CostumEditBox;
