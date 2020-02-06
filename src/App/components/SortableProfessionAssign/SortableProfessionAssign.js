import React, { Component } from "react";
import { ReactSortable, Sortable } from "react-sortablejs";
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
  render() {
    return (
      <Card className="mt-2">
        <div id="container" className={classes.container}>
          <div className={classes.layout}>
            <h5>Un-asigned Professions</h5>
            <ReactSortable
              group="shared"
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              sort={false}
              list={this.props.unAsignedColumns}
              setList={newState =>
                this.props.unAsignedColumnsHandler(newState)
              }>
              {this.props.unAsignedColumns.map(item => (
                <div className={classes.listElementlayout} key={item.FieldID}>
                  {item.ExportField}
                </div>
              ))}
            </ReactSortable>
          </div>
          <div className={classes.asignedFields}>
            <h5>Asigned Professions</h5>
            <ReactSortable
              group="shared"
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              list={this.props.asignedColumnsList}
              setList={newState =>
                this.props.asignedColumnsChangehandler(newState)
              }>
              {this.props.asignedColumnsList.map(item => (
                <div className={classes.listElementasignedFields} key={item.ID}>
                  {item.Field_name}
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
      </Card>
    );
  }
}

export default SortableProfessionAssign;
