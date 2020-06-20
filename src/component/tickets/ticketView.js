import React from "react";
import { connect } from "react-redux";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import { startEditTicket } from "../../action/ticketAction";

class TicketView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleEdit = (id) => {
    this.props.history.push(`/ticket/edit/${id}`);
  };
  render() {
    const employee = this.props.tickets.employees.find((ele) => ele._id);
    return (
      <div className="box-container4">
        <div>
          <Col sm="6">
            <Card body inverse color="danger">
              <CardTitle>TICKET INFO</CardTitle>
              <CardText>
                <h3>Code:{this.props.tickets.code}</h3>
                <h3>
                  Customer:
                  {this.props.customers.map(
                    (ele) => ele._id == this.props.tickets.customer && ele.name
                  )}
                </h3>
                <h3>
                  Department:
                  {this.props.departments.map(
                    (ele) =>
                      ele._id == this.props.tickets.department && ele.name
                  )}
                </h3>
                <h3>
                  Employee:
                  {this.props.employees.map(
                    (ele) => ele._id === employee._id && ele.name
                  )}
                </h3>
                <h3>Message:{this.props.tickets.message}</h3>
                <h3>Priority:{this.props.tickets.priority}</h3>
                <Button
                  color="primary"
                  onClick={() => this.handleEdit(this.props.tickets._id)}
                >
                  EDIT
                </Button>
              </CardText>
            </Card>
          </Col>
        </div>

        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tickets: state.tickets.find(
      (ticket) => ticket._id === props.match.params.id
    ),
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
  };
};

export default connect(mapStateToProps)(TicketView);
