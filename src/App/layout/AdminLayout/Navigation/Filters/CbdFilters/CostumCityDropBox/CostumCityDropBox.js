import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { states } from "../../../../../../../assets/states";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";

class CostumDropBox extends Component {
  // state = {
  //   dropElements: states,
  // };

  componentDidUpdate() {}
  onChangeHandler(event) {
    this.props.CityChangeAction(event.target.value);
  }
  render() {
    const dropElements = this.props.citiesByState.map((item, indx) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
    dropElements.unshift(
      <option key={0} value={null}>
        all
      </option>
    );
    const cityValue =
      this.props.selectedCity !== undefined && this.props.selectedCity !== null
        ? this.props.selectedCity
        : "";
    const compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="xs"
            value={cityValue}
            as="select"
            id={this.props.item.id}
            className="mb-3"
            onChange={(e) => this.onChangeHandler(e)}>
            {dropElements}
          </Form.Control>
        </Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCity: state.cbdReducer.selectedCity,
    citiesByState: state.cbdReducer.citiesByState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CityChangeAction: (state) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_CITY,
        payload: state,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumDropBox);
