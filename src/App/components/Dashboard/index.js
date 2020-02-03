import React from "react";
import Aux from "../../../hoc/_Aux";
import DataGrid from "../DataTable/DataTableGrid";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import RecordCounter from "../RecordCount/RecordCount";

class Dashboard extends React.Component {
  componentDidMount() {}
  componentWillUnmount() {}
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

    const dataTable =
      this.props.loadDataTable || this.props.loadProfessionDataTable ? (
        <DataGrid
          columns={this.props.columns}
          data={this.props.data}
          availableProfessions={this.props.availableProfessions}
          profession={this.props.loadProfessionDataTable}
        />
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
    showCounterSpinner: state.filterReducer.showCounterSpinner,
    loadProfessionDataTable: state.filterReducer.loadProfessionDataTable,
    availableProfessions: state.filterReducer.availableProfessions
  };
};

export default connect(mapStateToProps)(Dashboard);
