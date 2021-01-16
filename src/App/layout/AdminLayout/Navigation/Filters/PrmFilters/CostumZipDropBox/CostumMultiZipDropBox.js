import React, { Component } from "react";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getZipsByStateAction from "../../../../../../../store/ActionCreators/prmActions/getZipsByStateAction";
import { Multiselect } from "multiselect-react-dropdown";

class CostumMultiDropBox extends Component {
  state = {
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
    let ZIPS = selectedList.map((item) => item.id);
    if (ZIPS.length >= 2) {
      ZIPS = ZIPS.filter((item) => {
        console.log("Filter Return:", item !== "all");
        return item !== "all";
      });
    }

    this.props.zipChangeAction(ZIPS.join());
    // if (ZIPS.length !== 0 && !ZIPS.includes("all"))
    //   this.props.loadZipByState(ZIPS.join());
    // console.log("SELECTED ZIPS:", ZIPS);
  };

  render() {
    const compBody = (
      <div className="nav-link">
        <Multiselect
          options={this.props.zipByState} // Options to display in the dropdown
          selectedValues={this.state.selectedStates} // Preselected value to persist in dropdown
          onSelect={this.onChangeHandler} // Function will trigger on select event
          onRemove={this.onChangeHandler} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          style={this.state.style}
          showCheckbox={true}
          closeIcon="cancel"
          placeholder="Select Zip-code"
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
    selectedZip: state.prmReducer.selectedZip,
    zipByState: state.prmReducer.zipByState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    zipChangeAction: (zips) =>
      dispatch({
        type: actionTypes.PRM_CHANGE_ZIP,
        payload: zips,
      }),
    // loadZipByState: (selectedZip) =>
    //   dispatch(getZipsByStateAction(selectedZip)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumMultiDropBox);
