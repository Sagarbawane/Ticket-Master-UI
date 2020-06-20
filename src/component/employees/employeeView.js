import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { findEmployee } from "../../selectors/employeeSelector";
import { startEditEmployee } from "../../action/employeeAction";
import { Link, Route, BrowserRouter } from "react-router-dom";
import TicketInfo from "./ticketInfo";

class EmployeeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      edit: false,
    };
  }

  handleEdit = (id) => {
    this.props.history.push(`/employee/edit/${id}`);
  };

  render() {
    console.log(this.props.employees);
    return (
      <div className="box-container4">
        <div>
          <h1>
            {this.props.employees.name}-{this.props.employees.email}
          </h1>
          <Button
            color="primary"
            onClick={() => {
              this.handleEdit(this.props.employees._id);
            }}
          >
            EDIT
          </Button>
        </div>

        <hr />

        <Button outline color="primary">
          ALL
        </Button>
        <Button outline color="primary">
          PENDING
        </Button>
        <Button outline color="primary">
          COMPLETED
        </Button>
        <hr />
        <h1>Tickets-{this.props.tickets.length}</h1>
        <BrowserRouter>
          <Button color="warning">
            {" "}
            <Link className="button4" to="/ticketinfo">
              TICKET INFO
            </Link>
          </Button>
          <Route path="/ticketinfo" component={TicketInfo}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    employees: findEmployee(state.employees, props.match.params.id),
    customers: state.customers,
    departments: state.departments,

    tickets: state.tickets,
  };
};

export default connect(mapStateToProps)(EmployeeView);
