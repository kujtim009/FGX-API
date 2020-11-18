import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
// import NavIcon from "./../../../Navigation/NavContent/NavIcon";
// import NavBadge from "./../../NavContent/NavBadge";
// import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

class CbdRandom extends Component {
  state = {
    inputName: null,
    inputValue: "",
    randomCheck: false,
  };

  onChangeHandler(event) {
    console.log("HELOOOOO: ", !isNaN(event.target.value));
    if (!isNaN(event.target.value) && this.state.randomCheck) {
      this.setState({
        inputValue: event.target.value,
        inputName: event.target.id,
      });
    }

    let timer = setTimeout(() => {
      this.props.changeOtherFilters(this.state);
      clearTimeout(timer);
    }, 500);
  }

  onCheckBoxCheckHandler(event) {
    console.log("HELOOOOO: ", !isNaN(event.target.value));
    if (!event.target.checked) {
      this.setState({
        inputValue: "",
        randomCheck: event.target.checked,
      });
    } else {
      this.setState({
        inputValue: "100",
        randomCheck: event.target.checked,
      });
    }
  }
  render() {
    let compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Check
            custom
            key={11}
            type="checkbox"
            id={this.props.item.id + "c"}
            label={this.props.item.title}
            checked={this.state.randomCheck}
            onChange={(e) => this.onCheckBoxCheckHandler(e)}
          />
          <Form.Control
            size="sm"
            id={this.props.item.id}
            type="text"
            placeholder="(max 10000)"
            className="mb-3 dark"
            value={this.state.inputValue}
            onChange={(e) => this.onChangeHandler(e)}
          />
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    changeOtherFilters: (filters) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_OTHERFILTERS,
        payload: filters,
      }),
  };
};
export default connect(null, mapDispatchToprops)(CbdRandom);
