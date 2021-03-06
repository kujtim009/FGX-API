import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../store/actions";
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

class CostumComboBox extends Component {
  state = {
    inputName: null,
    inputValue: "",
    selectedValue: "1",
    selectItems: [
      { name: "Exact", value: 1, status: true },
      { name: "Begins", value: 2, status: false },
      { name: "Contains", value: 3, status: false }
    ]
  };

  componentDidMount() {
    this.setState({
      inputName: this.props.item.id
    });
  }

  onChangeTextHandler(event) {
    this.setState({
      inputValue: event.target.value,
      inputName: event.target.id
    });

    const timer = setTimeout(() => {
      this.props.changeComboFilters({
        inputName: this.state.inputName,
        inputValue: this.state.inputValue,
        selectedValue: this.state.selectedValue
      });
      clearTimeout(timer);
    }, 500);
  }

  radioNameParser(fullName) {
    const arrName = fullName.split("_");
    return arrName[1];
  }

  onRadioCheckHandler(event) {
    // console.log("CostumComboBox.js: ", event.target.id, event.target.checked);
    const tempRadioItems = this.state.selectItems.map(item => {
      if (this.radioNameParser(event.target.id) == item.value) {
        return {
          name: item.name,
          value: item.value,
          status: true
        };
      } else {
        return {
          name: item.name,
          value: item.value,
          status: false
        };
      }
    });

    this.setState({
      selectItems: tempRadioItems,
      selectedValue: this.radioNameParser(event.target.id)
    });

    const timer = setTimeout(() => {
      this.props.changeComboFilters({
        inputName: this.state.inputName,
        inputValue: this.state.inputValue,
        selectedValue: this.state.selectedValue
      });
      clearTimeout(timer);
    }, 500);
  }
  render() {
    const dropElements = this.state.selectItems.map((item, indx) => (
      <Form.Check
        inline
        custom
        key={indx}
        type="radio"
        id={this.props.item.id + "_" + item.value}
        name={this.props.item.id}
        label={item.name}
        checked={item.status}
        onChange={e => this.onRadioCheckHandler(e)}
      />
    ));

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
            onChange={e => this.onChangeTextHandler(e)}
          />

          {dropElements}
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapDispatchToprops = dispatch => {
  return {
    changeComboFilters: filters =>
      dispatch({
        type: actionTypes.CHANGE_COMBO_FILTERS,
        payload: filters
      })
  };
};
export default connect(null, mapDispatchToprops)(CostumComboBox);
