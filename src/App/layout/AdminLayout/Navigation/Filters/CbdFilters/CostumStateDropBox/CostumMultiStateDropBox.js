import React, { Component } from "react";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getCityByStateAction from "../../../../../../../store/ActionCreators/cbdActions/getCityByStateAction";
import { Multiselect } from "multiselect-react-dropdown";

class CostumMultiDropBox extends Component {
  state = {
    dropElements: states,
    selectedStates: [{ id: "all", name: "All" }],
    style: {
      chips: {
        fontSize: "12px",

        maxHeight: "20px",
        background: "rgb(37, 87, 122)",
      },
      searchBox: { width: "230px", paddingLeft: "1px", paddingTop: "2px" },
      multiselectContainer: {
        color: "blue",

        background: "rgb(41, 65, 82)",
      },
      optionContainer: {
        // To change css for option container

        background: "rgb(41, 65, 82)",
      },
      option: {
        // To change css for dropdown options\
        height: "30px",
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
          selectedValues={this.state.selectedStates} // Preselected value to persist in dropdown
          onSelect={this.onChangeHandler} // Function will trigger on select event
          onRemove={this.onChangeHandler} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          style={this.state.style}
          showCheckbox={true}
          closeIcon="cancel"
          placeholder="Select states"
          closeOnSelect={true}
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
