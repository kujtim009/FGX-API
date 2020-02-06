import React, { Component } from "react";
// import { ReactSortable, Sortable } from "react-sortablejs";
import { AgGridReact } from "ag-grid-react";
import { Form, Row, Col, Button, Card, Collapse } from "react-bootstrap";
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
    console.log(this.gridApi.getSelectedNodes());
    const selectedProfessions = this.gridApi.getSelectedNodes().map(item => ({
      title: item.data.title
    }));
    console.log(selectedProfessions);
    this.props.unAsignedProfessionHandler(selectedProfessions);
  };
  onAsignedButtonClick = e => {
    console.log(this.gridApi2.getSelectedNodes());
    const selectedProfessions = this.gridApi2.getSelectedNodes().map(item => ({
      title: item.data.title
    }));
    console.log(selectedProfessions);
    this.props.asignedProfessionChangehandler(selectedProfessions);
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
              <button onClick={this.onUnAsignedButtonClick}>
                Get selected rows
              </button>
              <AgGridReact
                key="0"
                rowSelection="multiple"
                columnDefs={columnsUnasigned}
                rowData={this.props.unAsignedProfessions}
                onGridReady={params => (this.gridApi = params.api)}
              />
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
              <button onClick={this.onAsignedButtonClick}>
                Get selected rows
              </button>
              <AgGridReact
                key="1"
                rowSelection="multiple"
                columnDefs={columnsAsigned}
                rowData={this.props.asignedProfessions}
                onGridReady={params => (this.gridApi2 = params.api)}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default SortableProfessionAssign;
