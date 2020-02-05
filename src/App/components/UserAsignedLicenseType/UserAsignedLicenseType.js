import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

class UserAsignedLicenseType extends Component {
  state = {
    availableLicenseTypes: [
      {
        title: "Occupatinal",
        id: "olf",
        Status: false
      },
      {
        title: "Business",
        id: "blf",
        Status: false
      },
      {
        title: "Professional",
        id: "plf",
        Status: false
      },
      {
        title: "Liquor",
        id: "llf",
        Status: false
      }
    ]
  };

  onCheckboxHandler(event) {
    let tempLicTypes = [];
    if (event.target.checked) {
      console.log("EVENT TARGET1: ", event.target.checked);
      tempLicTypes = this.state.availableLicenseTypes.filter(item => {
        const targetId = event.target.id.split("_")[0];
        return (
          targetId === item.id ||
          this.props.usersLicType.some(everyItem => item.id === everyItem.id)
        );
      });
    } else {
      console.log("EVENT TARGET2: ", event.target.checked);
      tempLicTypes = this.props.usersLicType.filter(item => {
        const targetId = event.target.id.split("_")[0];
        return targetId !== item.id;
      });
    }

    // const selLicTypes = this.getSelectedLicTypesToString(tempLicTypes);
    console.log("USER ASIGN LIC TYPE CHECKBOX CHECKED", tempLicTypes);
    this.props.changeUserLicTypeAction(tempLicTypes);
  }

  render() {
    // let licType = null;
    console.log("USER ASIGN LIC TYPE RENDER");
    const licType = this.state.availableLicenseTypes.map((item, index) => {
      return (
        <Form.Check
          custom
          key={"urs" + index}
          type="checkbox"
          id={item.id + "_usr"}
          label={item.title}
          checked={this.props.usersLicType.some(
            everyItem => item.id === everyItem.id
          )}
          onChange={e => this.onCheckboxHandler(e)}
        />
      );
    });

    let compBody = (
      <div className="nav-link">
        <Form.Group>{licType}</Form.Group>
      </div>
    );
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserLicTypeAction: updatedLicTypes =>
      dispatch({
        type: actionTypes.CHANGE_USER_LIC_TYPE,
        payload: updatedLicTypes
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAsignedLicenseType);
// export default LicenseType;
