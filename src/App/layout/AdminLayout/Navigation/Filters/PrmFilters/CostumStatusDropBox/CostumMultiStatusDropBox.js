import React, { Component } from "react";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getZipsByStateAction from "../../../../../../../store/ActionCreators/prmActions/getZipsByStateAction";
import { Multiselect } from "multiselect-react-dropdown";
import statuses from "../../../../../../../assets/statuses";

class CostumMultiDropBox extends Component {
  state = {
    statuses: statuses,
    selectedStatus: [{ id: "all", name: "All" }],
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
  // componentDidMount() {
  //   console.log(statuses);
  //   this.setState({
  //     statuses: statuses,
  //   });
  // }
  onChangeHandler = (selectedList, selectedItems) => {
    let statuses = selectedList.map((item) => item.id);
    if (statuses.length >= 2) {
      statuses = statuses.filter((item) => {
        console.log("Filter Return:", item !== "all");
        return item !== "all";
      });
    }

    this.props.statusChangeAction(statuses.join());
    // if (statuses.length !== 0 && !statuses.includes("all"))
    //   this.props.loadZipByState(statuses.join());
    // console.log("SELECTED statuses:", statuses);
  };

  render() {
    const compBody = (
      <div className="nav-link">
        <Multiselect
          options={this.state.statuses} // Options to display in the dropdown
          selectedValues={this.state.selectedStatus} // Preselected value to persist in dropdown
          onSelect={this.onChangeHandler} // Function will trigger on select event
          onRemove={this.onChangeHandler} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          style={this.state.style}
          showCheckbox={true}
          closeIcon="cancel"
          placeholder="Select status"
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
    selectedStatus: state.prmReducer.selectedStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    statusChangeAction: (statuses) =>
      dispatch({
        type: actionTypes.PRM_CHANGE_STATUS,
        payload: statuses,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CostumMultiDropBox);
