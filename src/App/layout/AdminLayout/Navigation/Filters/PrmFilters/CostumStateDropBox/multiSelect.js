import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { states } from "../../../../../../../assets/multiSelectStates";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";
import getCityByStateAction from "../../../../../../../store/ActionCreators/cbdActions/getCityByStateAction";
import { Multiselect } from "multiselect-react-dropdown";
import { object } from "prop-types";

function MultiDropBox(props) {
  const compBody = (
    <div className="nav-link">
      <Multiselect
        options={props.dropElements} // Options to display in the dropdown
        selectedValues={null} // Preselected value to persist in dropdown
        onSelect={props.onSelect} // Function will trigger on select event
        onRemove={props.onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
    </div>
  );
  return <React.Fragment>{compBody}</React.Fragment>;
}

export default MultiDropBox;
