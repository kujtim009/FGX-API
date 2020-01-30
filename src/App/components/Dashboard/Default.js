import React from "react";
import Aux from "../../../hoc/_Aux";
import DataGrid from "../DataTable/DataTableGrid";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import RecordCounter from "../RecordCount/RecordCount";

class Dashboard extends React.Component {
  render() {
    const loader = (
      <div>
        <BarLoader
          width={100 + "%"}
          color="gray"
          loading={this.props.showCounterSpinner}
        />
      </div>
    );
    const recordCounter = this.props.showCounter ? (
      <RecordCounter
        counter={this.props.recordCount}
        counterSpinner={this.props.counterSpinner}
      />
    ) : null;

    const dataTable = this.props.loadDataTable ? (
      <DataGrid columns={this.props.columns} data={this.props.data} />
    ) : null;

    return (
      <Aux>
        {loader}
        {recordCounter}
        {dataTable}
      </Aux>
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
    showCounterSpinner: state.filterReducer.showCounterSpinner
  };
};

export default connect(mapStateToProps)(Dashboard);
