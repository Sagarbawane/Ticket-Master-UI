import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { startGetLogout } from "../action/userAction";
import { connect } from "react-redux";
import Customer from "./customers/customers";
import Departments from "./departments/departments";
import Employees from "./employees/employees";
import Tickets from "./tickets/tickets";
import CustomerView from "./customers/CustomerView";
import customerEdit from "./customers/customerEdit";
import DepartmentView from "./departments/departmentView";
import DepartmentEdit from "./departments/departmentEdit";
import EmployeeEdit from "./employees/employeeEdit";
import EmployeeView from "./employees/employeeView";
import TicketView from "./tickets/ticketView";
import TicketEdit from "./tickets/ticketEdit";
import TicketInfo from "./customers/ticketInfo";

class Dashbaord extends React.Component {
  handleLogout = () => {
    this.props.dispatch(startGetLogout());
  };
  render() {
    return (
      <div className="box-container1">
        <header className="nav2">
          <h1 className="logo">Ticket</h1>
          <h1 className="logo"> Master</h1>
          <Link className="button2" to="/">
            Home
          </Link>
          <BrowserRouter>
            <Link className="button2" to="/customers">
              Customers
            </Link>
            <Link className="button2" to="/department">
              Departments
            </Link>
            <Link className="button2" to="/employee">
              Employess
            </Link>

            <Link className="button2" to="/ticket">
              Tickets
            </Link>

            <Link className="button2" onClick={this.handleLogout} to="#">
              Logout
            </Link>

            <Route path="/customers" component={Customer} exact={true} />
            <Route
              path="/customers/edit/:id"
              component={customerEdit}
              exact={true}
            />
            <Route
              path="/customers/:id"
              component={CustomerView}
              exact={true}
            />
            <Route path="/department" component={Departments} exact={true} />
            <Route
              path="/department/:id"
              component={DepartmentView}
              exact={true}
            />
            <Route
              path="/department/edit/:id"
              component={DepartmentEdit}
              exact={true}
            />
            <Route path="/employee" component={Employees} exact={true} />
            <Route path="/employee/:id" component={EmployeeView} exact={true} />
            <Route
              path="/employee/edit/:id"
              component={EmployeeEdit}
              exact={true}
            />
            <Route path="/ticket" component={Tickets} exact={true} />
            <Route path="/ticket/:id" component={TicketView} exact={true} />
            <Route
              path="/ticket/edit/:id"
              component={TicketEdit}
              exact={true}
            />

            <Route path="/ticketinfo" component={TicketInfo}></Route>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default connect()(Dashbaord);
