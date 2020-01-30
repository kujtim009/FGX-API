import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const DataGrid = props => {
  let columns = null;
  let data = null;
  if (!props.profession) {
    data = props.data;
    columns = props.columns.map(item => ({
      headerName: item.name,
      field: item.name,
      sortable: true,
      filter: true
    }));
    console.log("DATA COLUMNS:", columns, "ROWS:", data);
  } else {
    columns = [
      {
        headerName: "Profession",
        field: "profession",
        sortable: true,
        filter: true
      },
      {
        headerName: "Count",
        field: "count",
        sortable: true,
        filter: true
      }
    ];

    data = Object.keys(props.availableProfessions).map(key => ({
      profession: key,
      count: props.availableProfessions[key]
    }));
    console.log("PROFESSIONs COLUMNS:", columns, "ROWS:", data);
  }

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        maxWidth: "100%"
      }}>
      <AgGridReact columnDefs={columns} rowData={data}></AgGridReact>
    </div>
  );
};

export default DataGrid;
