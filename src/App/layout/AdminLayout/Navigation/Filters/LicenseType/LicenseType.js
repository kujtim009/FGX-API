import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import getUserLicenseTypes from "../../../../../../store/ActionCreators/filterActions";
import * as actionTypes from "../../../../../../store/actions";

class LicenseType extends Component {
  state = {
    licenseType: [
      { title: "Proffesional", id: "plf", Status: true },
      { title: "Occupational", id: "ocl", Status: false },
      { title: "Liquor", id: "liq", Status: false },
      { title: "Business", id: "blf", Status: false }
    ]
  };

  componentDidUpdate() {}
  // componentWillMount() {
  //   this.props.getUserLicTypeAction();
  // }
  componentDidMount() {
    console.log("LICENSE TYPE COMPONENT DID MOUNT");
    console.log("LICENSE TYPE", this.props.availableLicTypes);
  }
  onCheckboxCheckHandler(event) {
    const tempLicTypes = this.state.licenseType.map(item => {
      if (event.target.id === item.id) {
        return { title: item.title, id: item.id, Status: event.target.checked };
      } else {
        return item;
      }
    });
    this.props.licenseChangeAction(tempLicTypes);
    // this.setState({
    //   licenseType: tempLicTypes
    // });
  }
  render() {
    let licType = null;
    if (this.props.availableLicTypes) {
      licType = this.props.availableLicTypes.map((item, index) => (
        <Form.Check
          custom
          key={index}
          type="checkbox"
          id={item.id}
          label={item.title}
          checked={item.Status}
          onChange={e => this.onCheckboxCheckHandler(e)}
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
const mapStateToProps = state => {
  return {
    availableLicTypes: state.filterReducer.availableLicTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    licenseChangeAction: licenseTypes =>
      dispatch({
        type: actionTypes.CHANGE_LICENSETYPE,
        payload: licenseTypes
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseType);
// export default LicenseType;
