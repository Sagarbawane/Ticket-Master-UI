import React from "react";
import { connect } from "react-redux";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

class TicketInfo extends React.Component {
  render() {
    return (
      <div>
        {this.props.tickets.map((ticket) => {
          return (
            <div>
              <Col>
                <Col sm="6">
                  <Card body inverse color="danger">
                    <CardTitle>TICKET INFO</CardTitle>
                    <CardText>
                      <h3>Code:{ticket.code}</h3>
                      <h3>
                        Customer:{" "}
                        {this.props.customers.map((ele) => {
                          return ele._id === ticket.customer && ele.name;
                        })}
                      </h3>
                      <h3>
                        Department:{" "}
                        {this.props.departments.map((ele) => {
                          return ele._id === ticket.department && ele.name;
                        })}
                      </h3>
                      <h3>Employee:{ticket.employee}</h3>
                      <h3>Message:{ticket.message}</h3>
                      <h3>Priority:{ticket.priority}</h3>
                    </CardText>
                  </Card>
                </Col>
              </Col>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    customers: state.customers,
    customers: state.customers,
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(TicketInfo);
