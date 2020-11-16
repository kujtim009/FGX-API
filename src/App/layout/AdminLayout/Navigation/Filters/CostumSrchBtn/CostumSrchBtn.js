import React, { Component } from "react";
import { connect } from "react-redux";
// import NavIcon from "./../../../Navigation/NavContent/NavIcon";
// import NavBadge from "./../../NavContent/NavBadge";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as actionTypes from "../../../../../../store/actions";
import runQueryActionCreator from "../../../../../../store/ActionCreators/queryAction";

class CostumSrchBtn extends Component {
  state = {
    search: false,
  };

  onSearchHandler(event) {
    this.setState({
      search: true,
    });
    this.props.onClickAction(
      this.props.selectedLicenseTypes,
      this.props.selectedProfession,
      this.props.selectedProfessionBucket,
      this.props.selectedProfessionSubBucket,
      this.props.selectedState,
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
    selectedLicenseTypes: state.filterReducer.selectedLicenseTypes,
    selectedProfession: state.filterReducer.selectedProfession,
    selectedProfessionBucket: state.filterReducer.selectedProfessionBucket,
    selectedProfessionSubBucket:
      state.filterReducer.selectedProfessionSubBucket,
    selectedState: state.filterReducer.selectedState,
    otherFilters: state.filterReducer.otherFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAction: (
      selectedLicenseTypes,
      selectedProfession,
      selectedProfessionBucket,
      selectedProfessionSubBucket,
      selectedState,
      otherFilters
    ) =>
      dispatch(
        runQueryActionCreator(
          selectedLicenseTypes,
          selectedProfession,
          selectedProfessionBucket,
          selectedProfessionSubBucket,
          selectedState,
          otherFilters
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumSrchBtn);
