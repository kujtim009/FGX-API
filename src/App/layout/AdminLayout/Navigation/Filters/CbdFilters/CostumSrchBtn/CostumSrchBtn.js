import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import cbdRunQueryActionCreator from "../../../../../../../store/ActionCreators/cbdActions/queryAction";

class CostumSrchBtn extends Component {
  state = {
    search: false,
  };

  onSearchHandler(event) {
    this.setState({
      search: true,
    });
    this.props.onClickAction(
      this.props.selectedState,
      this.props.availableByerTypes,
      this.props.selectedCity,
      this.props.otherFilters,
      this.props.dobFrom,
      this.props.dobTo
    );
  }
  onClearHandler(event) {}
  render() {
    let compBody = (
      <div className="nav-link">
        <Button
          variant="secondary"
          size="sm"
          className="mb-0 red"
          onClick={() => this.onClearHandler()}>
          Clear
        </Button>
        <Button
          size="sm"
          className="mb-0"
          onClick={() => this.onSearchHandler()}>
          Search
        </Button>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
const mapStateToProps = (state) => {
  return {
    selectedState: state.cbdReducer.selectedState,
    availableByerTypes: state.cbdReducer.availableByerTypes,
    selectedCity: state.cbdReducer.selectedCity,
    otherFilters: state.cbdReducer.otherFilters,
    dobFrom: state.cbdReducer.dobFrom,
    dobTo: state.cbdReducer.dobTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAction: (
      selectedState,
      availableByerTypes,
      selectedCity,
      otherFilters,
      dobFrom,
      dobTo
    ) =>
      dispatch(
        cbdRunQueryActionCreator(
          selectedState,
          availableByerTypes,
          selectedCity,
          otherFilters,
          dobFrom,
          dobTo
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumSrchBtn);
