import React, { Component } from "react";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getCityByStateAction from "../../../../../../../store/ActionCreators/cbdActions/getCityByStateAction";
import { Multiselect } from "multiselect-react-dropdown";

class CostumMultiDropBox extends Component {
  state = {
    dropElements: states,
    selectedStates: "all",
    style: {
      chips: {
        fontSize: "12px",
        background: "rgb(37, 87, 122)",
      },
      searchBox: {},
      multiselectContainer: {
        color: "blue",
        background: "rgb(41, 65, 82)",
      },
      optionContainer: {
        // To change css for option container

        background: "rgb(41, 65, 82)",
      },
      option: {
        // To change css for dropdown options
        color: "grey",
      },
    },
  };

  onChangeHandler = (selectedList, selectedItems) => {
    let states = selectedList.map((item) => item.id);
    if (states.length >= 2) {
      states = states.filter((item) => {
        console.log("Filter Return:", item !== "all");
        return item !== "all";
      });
      console.log("aaaaa", states);
    }

    this.props.stateChangeAction(states.join());
    if (states.length <= 1 && !states.includes("all"))
      this.props.loadCityByState(states.join());
  };
  render() {
    const compBody = (
      <div className="nav-link">
        <Multiselect
          options={this.state.dropElements} // Options to display in the dropdown
          selectedValues={[{ id: "all", name: "All states" }]} // Preselected value to persist in dropdown
          onSelect={this.onChangeHandler} // Function will trigger on select event
          onRemove={this.onChangeHandler} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          style={this.state.style}
          showCheckbox={true}
          closeIcon="cancel"
          placeholder="Select states"
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          autocomplete="off"
        />
        {/* <Form.Control
            size="xs"
            value={this.props.selectedState}
            as="select"
            id={this.props.item.id}
            className="mb-3"
            onChange={(e) => this.onChangeHandler(e)}>
            {dropElements}
          </Form.Control> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(CostumMultiDropBox);
