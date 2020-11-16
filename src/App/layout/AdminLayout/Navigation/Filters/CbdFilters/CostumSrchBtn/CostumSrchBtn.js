import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      this.props.dobTo,
      this.props.recordAdded
    );
  }
  onClearHandler(event) {}
  render() {
    let compBody = (
      <div className="nav-link">
        <Link to="/dashboard">
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
        </Link>
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
    recordAdded: state.cbdReducer.recordAdded,
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
      dobTo,
      recordAdded
    ) =>
      dispatch(
        cbdRunQueryActionCreator(
          selectedState,
          availableByerTypes,
          selectedCity,
          otherFilters,
          dobFrom,
          dobTo,
          recordAdded
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumSrchBtn);
