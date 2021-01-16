import React, { Component } from "react";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getZipsByStateAction from "../../../../../../../store/ActionCreators/prmActions/getZipsByStateAction";
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
    }

    this.props.stateChangeAction(states.join());
    if (states.length !== 0 && !states.includes("all"))
      this.props.loadZipByState(states.join());
    console.log("SELECTED STATES:", states);
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
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedState: state.prmReducer.selectedState,
    selectedLicenseTypes: state.filterReducer.selectedLicenseTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stateChangeAction: (state) =>
      dispatch({
        type: actionTypes.PRM_CHANGE_STATE,
        payload: state,
      }),
    loadZipByState: (selectedState) =>
      dispatch(getZipsByStateAction(selectedState)),
  };
};

// const mapStateToProps = (state) => {
//   return {
//     selectedZip: state.prmReducer.selectedZip,
//     zipByState: state.prmReducer.zipByState,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     ZipChangeAction: (state) =>
//       dispatch({
//         type: actionTypes.PRM_CHANGE_ZIP,
//         payload: state,
//       }),
//   };
// };
export default connect(mapStateToProps, mapDispatchToProps)(CostumMultiDropBox);
