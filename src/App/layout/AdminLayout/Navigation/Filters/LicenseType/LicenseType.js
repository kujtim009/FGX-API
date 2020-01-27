import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../../../../../store/actions";
import getUserProfessions from "../../../../../../store/ActionCreators/getProfessionAction";

class LicenseType extends Component {
  // state = {
  //   licenseType: [
  //     { title: "Proffesional", id: "plf", Status: true },
  //     { title: "Occupational", id: "ocl", Status: false },
  //     { title: "Liquor", id: "liq", Status: false },
  //     { title: "Business", id: "blf", Status: false }
  //   ]
  // };

  componentDidUpdate() {}
  // componentWillMount() {
  //   this.props.getUserLicTypeAction();
  // }
  componentDidMount() {}

  getSelectedLicTypesToString = licTypes => {
    return licTypes
      .filter(item => {
        return item.Status === true;
      })
      .map(item => item.id)
      .join();
  };

  onCheckboxCheckHandler(event) {
    const tempLicTypes = this.props.availableLicTypes.map(item => {
      if (event.target.id === item.id) {
        return { title: item.title, id: item.id, Status: event.target.checked };
      } else {
        return item;
      }
    });
    const selLicTypes = this.getSelectedLicTypesToString(tempLicTypes);
    this.props.licenseChangeAction(tempLicTypes, selLicTypes);
    this.props.LoadProfessionAction(selLicTypes, this.props.selectedState);
  }
  render() {
    console.log("LICENSE TYPE RENDER1");
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
    console.log("LICENSE TYPE RENDER2");
    return <React.Fragment>{compBody}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return {
    availableLicTypes: state.filterReducer.availableLicTypes,
    selectedState: state.filterReducer.selectedState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    licenseChangeAction: (licenseTypes, selectedTypes) =>
      dispatch({
        type: actionTypes.CHANGE_LICENSETYPE,
        payload: {
          licenseTypes: licenseTypes,
          selectedLicenseTypes: selectedTypes
        }
      }),
    LoadProfessionAction: (selectedTypes, selectedState) =>
      dispatch(getUserProfessions(selectedTypes, selectedState))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseType);
// export default LicenseType;
