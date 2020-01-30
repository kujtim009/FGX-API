import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const DataGrid = props => {
  console.log("DATA GRID: ", props.columns);
  const columns = props.columns.map(item => ({
    headerName: item.name,
    field: item.name,
    sortable: true,
    filter: true
  }));
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        width: "100%"
      }}>
      <AgGridReact columnDefs={columns} rowData={props.data}></AgGridReact>
    </div>
  );
};

export default DataGrid;
