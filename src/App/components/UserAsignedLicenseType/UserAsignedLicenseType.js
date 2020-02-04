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
        title: "Busyness",
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
    let licType = null;
    if (this.props.availableLicTypes) {
      licType = this.state.availableLicenseTypes.map((item, index) => {
        return (
          <Form.Check
            custom
            key={index}
            type="checkbox"
            id={item.id}
            label={item.title}
            checked={this.props.availableLicTypes.some(
              everyItem => item.id === everyItem.id
            )}
            onChange={e => this.onCheckboxCheckHandler(e)}
          />
        );
      });
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
  return {};
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
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAsignedLicenseType);
// export default LicenseType;
