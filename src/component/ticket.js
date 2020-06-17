import React from "react";
import { connect } from "react-redux";
import { startPostTicket } from "../action/ticketAction";
import { startRemoveTicket } from "../action/ticketAction";
import { Link, Route, BrowserRouter } from "react-router-dom";
import TicketView from "./ticketView";

class Ticket extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      customer: "",
      department: "",
      employee: "",
      message: "",
      priority: "high",
      toggle: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employee: this.state.employee,
      message: this.state.message,
      priority: this.state.priority,
    };

    this.props.dispatch(startPostTicket(formData));
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };
  handleToggle = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };
  handleSelectChange = (event) => {
    this.setState({ priority: event.target.value });
  };
  render() {
    let { priority } = this.state;
    return (
      <div>
        {!this.state.toggle ? (
          <div className="box-container7">
            <button className="button5">Pending</button>{" "}
            <button className="button5">Completed</button>
            <h1 className="title1">Ticket -{this.props.tickets.length}</h1>
            <table>
              <thead>
                <tr>
                  <th>code</th>
                  <th>Customer</th>
                  <th>Department</th>
                  <th>Employee</th>
                  <th>Message</th>
                  <th>Priority</th>
                  <th>Action</th>
                  <th>Remove</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tickets.map((ele) => {
                  return (
                    <tr>
                      <td>{ele.code}</td>
                      <td>{this.props.customers.map((ele) => ele.name)}</td>
                      <td>{this.props.departments.map((ele) => ele.name)}</td>
                      <td>{this.props.employees.map((ele) => ele.name)}</td>
                      <td>{ele.message}</td>
                      <td>{ele.priority}</td>
                      <td>
                        <BrowserRouter>
                          <Link className="button5" to="/ticketView">
                            View
                          </Link>
                          <Route
                            path="/ticketView"
                            component={TicketView}
                          ></Route>
                        </BrowserRouter>
                      </td>
                      <td>
                        <button
                          className="button4"
                          onClick={() => {
                            this.props.dispatch(startRemoveTicket(ele._id));
                          }}
                        >
                          Remove
                        </button>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          value={this.state.completed}
                          onChange={this.handleCompleteChange}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="button6" onClick={this.handleToggle}>
              Add Ticket
            </button>
          </div>
        ) : (
          <div className="box-container8">
            <h1 className="title1">Add Ticket </h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="code">Code:</label>{" "}
              <input
                className="login-input3"
                type="code"
                id="code"
                name="code"
                value={this.state.code}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="customer">Customer:</label>{" "}
              <select
                className="login-input2"
                type="customer"
                id="customer"
                name="customer"
                value={this.state.customer}
                onChange={this.handleChange}
              >
                <option>select</option>
                {this.props.customers.map((ele) => {
                  return <option value={ele._id}>{ele.name}</option>;
                })}
              </select>
              <br />
              <label htmlFor="department">Department:</label>{" "}
              <select
                className="login-input2"
                type="department"
                id="department"
                name="department"
                value={this.state.department}
                onChange={this.handleChange}
              >
                <option>select</option>
                {this.props.departments.map((ele) => {
                  return <option value={ele.user}>{ele.name}</option>;
                })}
              </select>
              <br />
              <label htmlFor="employee">Employee:</label>{" "}
              <select
                className="login-input2"
                type="employee"
                id="employee"
                name="employee"
                value={this.state.employee}
                onChange={this.handleChange}
              >
                <option>select</option>
                {this.props.employees.map((ele) => {
                  return <option value={ele._id}>{ele.name}</option>;
                })}
              </select>
              <br />
              <label>Message:</label>{" "}
              <textarea
                name="message"
                className="login-input3"
                value={this.state.message}
                onChange={this.handleChange}
              ></textarea>
              <br />
              <label>Priority:</label>
              <fieldset
                className="login-input2"
                onChange={this.handleSelectChange}
              >
                <label>
                  <input
                    type="radio"
                    name="Priority-option"
                    value="high"
                    checked={priority === "high"}
                  />
                  HIGH
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="Priority-option"
                    value="medium"
                    checked={priority === "medium"}
                  />
                  MEDIUM
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="Priority-option"
                    value="low"
                    checked={priority === "low"}
                  />
                  LOW
                </label>
              </fieldset>
              <br />
              <input className="button" type="submit" value="register" />
            </form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    employees: state.employees,
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Ticket);
