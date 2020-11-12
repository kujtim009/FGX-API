import React from "react";
import Aux from "../../../hoc/_Aux";
import DataGrid from "../DataTable/DataTableGrid";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import RecordCounter from "../RecordCount/RecordCount";
import MainDownloadButton from "../MainDownloadButton/MainDownloadButton";
// import Dialog from "react-dialog";
import DownloadingBox from "../DownloadingBox/DownloadingBox";
import ApiAlert from "../Alert";

class Dashboard extends React.Component {
  handleClose = () => alert("CLose");
  render() {
    const showDownloadProgress = this.props.downloadStatus ? (
      <DownloadingBox />
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
            availableProfessionsBucket={this.props.availableProfessionsBucket}
            availableProfessionsSubBucket={
              this.props.availableProfessionsSubBucket
            }
            profession={this.props.loadProfessionDataTable}
          />
        </React.Fragment>
      ) : null;

    const dwnldButton = this.props.loadDataTable ? (
      <MainDownloadButton
        prms={this.props.queryPrm}
        activeProject={this.props.activeProject}
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
        {<ApiAlert show={this.props.showErrorMessage} />}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadDataTable: state.filterReducer.loadDataTable,
    data: state.filterReducer.data,
    columns: state.filterReducer.columns,
    recordCount: state.filterReducer.recordCount,
    showCounter: state.filterReducer.showCounter,
    showCounterSpinner: state.filterReducer.showCounterSpinner,
    loadProfessionDataTable: state.filterReducer.loadProfessionDataTable,
    availableProfessions: state.filterReducer.availableProfessions,
    availableProfessionsBucket: state.filterReducer.availableProfessionsBucket,
    availableProfessionsSubBucket:
      state.filterReducer.availableProfessionsSubBucket,
    queryPrm: state.filterReducer.queryPrm,
    downloadStatus: state.filterReducer.downloadStatus,
    showErrorMessage: state.filterReducer.showErrorMessage,
    activeProject: state.mainReducer.activeProject,
  };
};

export default connect(mapStateToProps)(Dashboard);
