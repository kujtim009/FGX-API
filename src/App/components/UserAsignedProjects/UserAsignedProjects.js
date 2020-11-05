import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

class UserAsignedLicenseType extends Component {
  state = {
    availableLicenseTypes: [
      {
        title: "Master License File",
        id: "mlf",
        Status: false,
      },
      {
        title: "CBD",
        id: "cbd",
        Status: false,
      },
    ],
  };

  onCheckboxHandler(event) {
    let tempLicTypes = [];
    if (event.target.checked) {
      tempLicTypes = this.state.availableLicenseTypes.filter((item) => {
        const targetId = event.target.id.split("_")[0];
        return (
          targetId === item.id ||
          this.props.usersProjects.some((everyItem) => item.id === everyItem.id)
        );
      });
    } else {
      tempLicTypes = this.props.usersProjects.filter((item) => {
        const targetId = event.target.id.split("_")[0];
        return targetId !== item.id;
      });
    }

    // const selLicTypes = this.getSelectedLicTypesToString(tempLicTypes);
    this.props.changeUserLicTypeAction(tempLicTypes);
  }

  render() {
    // let licType = null;
    const licType = this.state.availableLicenseTypes.map((item, index) => {
      return (
        <Form.Check
          custom
          key={"urs" + index}
          type="checkbox"
          id={item.id + "_usr"}
          label={item.title}
          checked={this.props.usersProjects.some(
            (everyItem) => item.id === everyItem.id
          )}
          onChange={(e) => this.onCheckboxHandler(e)}
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUserLicTypeAction: (updatedLicTypes) =>
      dispatch({
        type: actionTypes.CHANGE_USER_PROJECTS,
        payload: updatedLicTypes,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAsignedLicenseType);
// export default LicenseType;
