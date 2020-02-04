import React, { Component } from "react";
import { ReactSortable, Sortable } from "react-sortablejs";
import { Form, Row, Col, Button, Card, Collapse } from "react-bootstrap";
import classes from "./SortableList.module.css";
// new Sortable(example4Left, {
//     group: {
//         name: 'shared',
//         pull: 'clone',
//         put: false // Do not allow items to be put into this list
//     },
//     animation: 150,
//     sort: false // To disable sorting: set sort to false
// });

class ReactSortList extends Component {
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
  componentDidUpdate() {}
  render() {
    console.log(this.state);
    return (
      <Card className="mt-2">
        <div id="container" className={classes.container}>
          <div className={classes.layout}>
            <h5>Un-asigned columns</h5>
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
                <div className={classes.listElementlayout} key={item.ExportID}>
                  {item.ExportField}
                </div>
              ))}
            </ReactSortable>
          </div>
          <div className={classes.asignedFields}>
            <h5>Asigned columns</h5>
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

export default ReactSortList;
