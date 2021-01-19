import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import prmRunQueryActionCreator from "../../../../../../../store/ActionCreators/prmActions/queryAction";

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
      this.props.selectedZip,
      this.props.selectedStatus,
      this.props.otherFilters
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
    selectedState: state.prmReducer.selectedState,
    selectedZip: state.prmReducer.selectedZip,
    selectedStatus: state.prmReducer.selectedStatus,
    otherFilters: state.prmReducer.otherFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAction: (selectedState, selectedZip, selectedStatus, otherFilters) =>
      dispatch(
        prmRunQueryActionCreator(
          selectedState,
          selectedZip,
          selectedStatus,
          otherFilters
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumSrchBtn);
