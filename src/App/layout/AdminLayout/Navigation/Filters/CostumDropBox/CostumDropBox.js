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

class CostumDropBox extends Component {
  state = {
    dropName: "",
    dropElements: ["ALL STATES", "CA", "AR", "AL", "NM", "AZ"],
    selectedElement: "ALL STATES"
  };

  componentDidUpdate() {
    // console.log("Component did updatee: ", this.state, this.props.item);
  }
  onChangeHandler(event) {
    this.setState({
      dropName: event.target.id,
      selectedElement: event.target.value
    });
  }
  render() {
    const dropElements = this.state.dropElements.map((item, indx) => (
      <option key={indx}>{item}</option>
    ));
    const compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="xs"
            value={this.state.selectedElement}
            as="select"
            id={this.props.item.id}
            className="mb-3"
            onChange={e => this.onChangeHandler(e)}>
            {dropElements}
          </Form.Control>
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

export default CostumDropBox;
