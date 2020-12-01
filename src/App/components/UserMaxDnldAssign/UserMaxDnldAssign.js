import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

class UserAsignedLicenseType extends Component {
  onMaxDnldChange(e) {
    !isNaN(e.target.value)
      ? this.props.changeMaxDnld(e.target.value)
      : console.log("Not a number");
  }

  render() {
    let compBody = (
      <div className="input-group mb-3">
        <input
          type="text"
          id="username"
          value={this.props.userMaxDnld ? this.props.userMaxDnld : ""}
          className="form-control"
          placeholder="Maximum record download!"
          onChange={(e) => this.onMaxDnldChange(e)}
        />
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
    changeMaxDnld: (updatedMaxDnld) =>
      dispatch({
        type: actionTypes.CHANGE_USER_MAXDNLD,
        payload: updatedMaxDnld,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAsignedLicenseType);
// export default LicenseType;
