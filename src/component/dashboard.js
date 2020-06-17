import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { startGetLogout } from "../action/userAction";
import { connect } from "react-redux";
import Customer from "./customers";
import Department from "./department";
import Employee from "./employees";
import Ticket from "./ticket";

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
            <Route path="/department" component={Department} exact={true} />
            <Route path="/employee" component={Employee} exact={true} />
            <Route path="/ticket" component={Ticket} exact={true} />
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default connect()(Dashbaord);
