import React from "react";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";

class Cpanel extends React.Component {
  componentDidMount() {
    console.log("CPANEL MOUNTED", this.props.location);
  }
  componentWillUnmount() {
    console.log("CPANEL UNMOUNTED");
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>THIS IS CPANEL PAGE</h1>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadDataTable: state.filterReducer.loadDataTable,
    data: state.filterReducer.data,
    columns: state.filterReducer.columns,
    recordCount: state.filterReducer.recordCount,
    showCounter: state.filterReducer.showCounter,
    showCounterSpinner: state.filterReducer.showCounterSpinner,
    loadProfessionDataTable: state.filterReducer.loadProfessionDataTable,
    availableProfessions: state.filterReducer.availableProfessions
  };
};

export default connect(mapStateToProps)(Cpanel);
