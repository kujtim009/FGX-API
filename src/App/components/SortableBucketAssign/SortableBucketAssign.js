import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Card } from "react-bootstrap";
import classes from "./SortableProfessionAssign.module.css";

class SortableBucketsAssign extends Component {
  state = {
    layout: [],
    columns: [],
  };
  componentDidMount() {
    this.setState({
      layout: this.props.unAsignedColumns,
      columns: this.props.asignedColumnsList,
    });
  }

  onUnAsignedButtonClick = (e) => {
    if (this.gridApi.getSelectedNodes().length >= 1) {
      const selectedBuckets = this.gridApi.getSelectedNodes().map((item) => ({
        title: item.data.title,
      }));
      this.props.unAsignedBucketsHandler(selectedBuckets);
    }
  };
  onAsignedButtonClick = (e) => {
    if (this.gridApi2.getSelectedNodes().length >= 1) {
      const selectedBuckets = this.gridApi2.getSelectedNodes().map((item) => ({
        title: item.data.title,
      }));
      this.props.asignedBucketsChangeHandler(selectedBuckets);
    }
  };

  render() {
    const columnsUnasigned = [
      {
        headerName: "Profession",
        field: "title",
        sortable: true,
        filter: true,
        width: "300",
        checkboxSelection: true,
      },
    ];
    const columnsAsigned = [
      {
        headerName: "Profession",
        field: "title",
        sortable: true,
        filter: true,
        width: "300",
        checkboxSelection: true,
      },
    ];

    return (
      <Card className="mt-2">
        <div id="container" className={classes.container}>
          <div className={classes.layout}>
            <h5>Un-asigned Buckets</h5>
            <div
              className="ag-theme-balham"
              style={{
                height: "500px",
                maxWidth: "100%",
              }}>
              <AgGridReact
                key="0"
                rowSelection="multiple"
                columnDefs={columnsUnasigned}
                rowData={this.props.unAsignedBuckets}
                onGridReady={(params) => (this.gridApi = params.api)}
              />
              <Button onClick={this.onUnAsignedButtonClick}>
                Add Selected Profession Buckets
              </Button>
            </div>
          </div>
          <div className={classes.asignedFields}>
            <h5>Asigned Buckets</h5>
            <div
              className="ag-theme-balham"
              style={{
                height: "500px",
                maxWidth: "100%",
              }}>
              <AgGridReact
                key="1"
                rowSelection="multiple"
                columnDefs={columnsAsigned}
                rowData={this.props.asignedBuckets}
                onGridReady={(params) => (this.gridApi2 = params.api)}
              />
              <Button onClick={this.onAsignedButtonClick}>
                Remove Selected Buckets
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default SortableBucketsAssign;
