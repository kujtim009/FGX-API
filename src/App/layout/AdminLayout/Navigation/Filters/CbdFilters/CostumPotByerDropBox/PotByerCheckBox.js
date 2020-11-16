import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../../store/actions";

class LicenseType extends Component {
  onCheckboxCheckHandler(event) {
    const tempByerTypes = Object.entries(this.props.availableByerTypes).map(
      (item) => {
        console.log("POTBYER CHECKBOX:", item);
        if (event.target.id === item[0]) {
          return [item[0], event.target.checked];
        } else {
          return item;
        }
      }
    );
    this.props.ByerChangeAction(tempByerTypes);
  }
  render() {
    let licType = null;

    if (this.props.availableByerTypes) {
      licType = Object.entries(
        this.props.availableByerTypes
      ).map((item, index) => (
        <Form.Check
          custom
          key={index}
          type="checkbox"
          id={item[0]}
          label={item[0]}
          checked={item[1]}
          onChange={(e) => this.onCheckboxCheckHandler(e)}
        />
      ));
    } else {
      licType = null;
    }

    let compBody = (
      <div className="nav-link">
        <Form.Group>{licType}</Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
const mapStateToProps = (state) => {
  return {
    availableByerTypes: state.cbdReducer.availableByerTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ByerChangeAction: (byerTypes) =>
      dispatch({
        type: actionTypes.CHANGE_BYERTYPE,
        payload: {
          byerType: byerTypes,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseType);
