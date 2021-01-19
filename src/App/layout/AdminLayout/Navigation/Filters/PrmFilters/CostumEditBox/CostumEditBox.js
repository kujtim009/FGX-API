import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
// import NavIcon from "./../../../Navigation/NavContent/NavIcon";
// import NavBadge from "./../../NavContent/NavBadge";
// import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

class CostumEditBox extends Component {
  state = {
    inputName: null,
    inputValue: "",
  };

  componentDidUpdate() {
    // console.log("Component did updatee: ", this.state);
  }
  onChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
      inputName: event.target.id,
    });

    let timer = setTimeout(() => {
      this.props.changeOtherFilters(this.state);
      clearTimeout(timer);
    }, 500);
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
        type: actionTypes.PRM_CHANGE_OTHERFILTERS,
        payload: filters,
      }),
  };
};
export default connect(null, mapDispatchToprops)(CostumEditBox);
