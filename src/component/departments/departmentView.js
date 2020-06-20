import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { startEditDepartment } from "../../action/departmentAction";
import { findDepartment } from "../../selectors/departmentSelector";
import { Link, Route, BrowserRouter } from "react-router-dom";
import TicketInfo from "./ticketInfo";

class DepartmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      edit: false,
    };
  }

  handleEdit = (id) => {
    this.props.history.push(`/department/edit/${id}`);
  };

  render() {
    return (
      <div className="box-container4">
        <div>
          <h1>{this.props.departments.name}</h1>
          <Button
            color="primary"
            onClick={() => this.handleEdit(this.props.departments._id)}
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
    departments: state.departments,
    employees: state.employees,
    departments: findDepartment(state.departments, props.match.params.id),
    customers: state.customers,

    tickets: state.tickets,
  };
};

export default connect(mapStateToProps)(DepartmentView);
