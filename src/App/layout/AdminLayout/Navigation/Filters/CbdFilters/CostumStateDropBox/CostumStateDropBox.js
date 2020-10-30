import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { states } from "../../../../../../../assets/states";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getCityByStateAction from "../../../../../../../store/ActionCreators/cbdActions/getCityByStateAction";

class CostumDropBox extends Component {
  state = {
    dropElements: states,
  };

  componentDidUpdate() {}
  onChangeHandler(event) {
    this.props.stateChangeAction(event.target.value);
    this.props.loadCityByState(event.target.value);
  }
  render() {
    const dropElements = this.state.dropElements.map((item, indx) => (
      <option key={indx} value={item.value}>
        {item.key}
      </option>
    ));
    const compBody = (
      <div className="nav-link">
        <Form.Group>
          <Form.Control
            size="xs"
            value={this.props.selectedState}
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
    selectedState: state.cbdReducer.selectedState,
    selectedLicenseTypes: state.filterReducer.selectedLicenseTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateChangeAction: (state) =>
      dispatch({
        type: actionTypes.CBD_CHANGE_STATE,
        payload: state,
      }),
    loadCityByState: (selectedState) =>
      dispatch(getCityByStateAction(selectedState)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumDropBox);
