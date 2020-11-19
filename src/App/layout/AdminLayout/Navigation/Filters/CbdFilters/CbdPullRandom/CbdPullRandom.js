import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import { Form } from "react-bootstrap";

class CbdRandom extends Component {
  state = {
    inputName: null,
    inputValue: "",
    randomCheck: false,
  };

  onChangeHandler(event) {
    if (!isNaN(event.target.value) && this.state.randomCheck) {
      this.setState({
        inputValue: event.target.value,
        inputName: event.target.id,
      });
    }

    this.updateStateTimer();
  }

  updateStateTimer() {
    let timer = setTimeout(() => {
      this.props.changeOtherFilters(this.state);
      clearTimeout(timer);
    }, 500);
  }

  onCheckBoxCheckHandler(event) {
    if (!event.target.checked) {
      this.setState({
        inputValue: "",
        randomCheck: event.target.checked,
      });
    } else {
      this.setState({
        inputName: this.props.item.id,
        inputValue: "100",
        randomCheck: event.target.checked,
      });
    }
    this.updateStateTimer();
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
