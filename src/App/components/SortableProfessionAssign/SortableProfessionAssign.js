import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Card } from "react-bootstrap";
import classes from "./SortableProfessionAssign.module.css";

class SortableProfessionAssign extends Component {
  state = {
    layout: [],
    columns: []
  };
  componentDidMount() {
    this.setState({
      layout: this.props.unAsignedColumns,
      columns: this.props.asignedColumnsList
    });
  }

  onUnAsignedButtonClick = e => {
    if (this.gridApi.getSelectedNodes().length >= 1) {
      const selectedProfessions = this.gridApi.getSelectedNodes().map(item => ({
        title: item.data.title
      }));
      this.props.unAsignedProfessionHandler(selectedProfessions);
    }
  };
  onAsignedButtonClick = e => {
    if (this.gridApi2.getSelectedNodes().length >= 1) {
      const selectedProfessions = this.gridApi2
        .getSelectedNodes()
        .map(item => ({
          title: item.data.title
        }));
      this.props.asignedProfessionChangehandler(selectedProfessions);
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
        checkboxSelection: true
      }
    ];
    const columnsAsigned = [
      {
        headerName: "Profession",
        field: "title",
        sortable: true,
        filter: true,
        width: "300",
        checkboxSelection: true
      }
    ];

    return (
      <Card className="mt-2">
        <div id="container" className={classes.container}>
          <div className={classes.layout}>
            <h5>Un-asigned Professions</h5>
            <div
              className="ag-theme-balham"
              style={{
                height: "500px",
                maxWidth: "100%"
              }}>
              <AgGridReact
                key="0"
                rowSelection="multiple"
                columnDefs={columnsUnasigned}
                rowData={this.props.unAsignedProfessions}
                onGridReady={params => (this.gridApi = params.api)}
              />
              <Button onClick={this.onUnAsignedButtonClick}>
                Add Selected Professions
              </Button>
            </div>
          </div>
          <div className={classes.asignedFields}>
            <h5>Asigned Professions</h5>
            <div
              className="ag-theme-balham"
              style={{
                height: "500px",
                maxWidth: "100%"
              }}>
              <AgGridReact
                key="1"
                rowSelection="multiple"
                columnDefs={columnsAsigned}
                rowData={this.props.asignedProfessions}
                onGridReady={params => (this.gridApi2 = params.api)}
              />
              <Button onClick={this.onAsignedButtonClick}>
                Remove Selected Professions
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default SortableProfessionAssign;
