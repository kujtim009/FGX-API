import React from "react";
import Aux from "../../../hoc/_Aux";
import DataGrid from "../DataTable/DataTableGrid";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import RecordCounter from "../RecordCount/RecordCount";
import MainDownloadButton from "../MainDownloadButton/MainDownloadButton";
import Dialog from "react-dialog";

class Dashboard extends React.Component {
  handleClose = () => alert("CLose");
  render() {
    const showDownloadProgress = this.props.downloadStatus ? (
      <Dialog
        title="Data Downloading Progress"
        modal={false}
        onClose={this.handleClose}
        buttons={[
          {
            text: "Close",
            onClick: () => this.handleClose()
          }
        ]}>
        <h1>Dialog Content</h1>
        <p>More Content. Anything goes here</p>
      </Dialog>
    ) : null;

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
        <React.Fragment>
          <DataGrid
            columns={this.props.columns}
            data={this.props.data}
            availableProfessions={this.props.availableProfessions}
            profession={this.props.loadProfessionDataTable}
          />
        </React.Fragment>
      ) : null;

    const dwnldButton = this.props.loadDataTable ? (
      <MainDownloadButton
        prms={this.props.queryPrm}
        status={this.props.downloadStatus}
        dnldData={this.props.data}
        dnldColumns={this.props.columns}
      />
    ) : null;

    return (
      <Aux>
        {loader}
        {recordCounter}
        {dataTable}
        {dwnldButton}
        {showDownloadProgress}
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
    availableProfessions: state.filterReducer.availableProfessions,
    queryPrm: state.filterReducer.queryPrm,
    downloadStatus: state.filterReducer.downloadStatus
  };
};

export default connect(mapStateToProps)(Dashboard);
