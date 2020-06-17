import React from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { startPostEmployee } from "../action/employeeAction";
import { startRemoveEmployee } from "../action/employeeAction";
import EmployeeView from "./employeeView";

class Employee extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      department: "",
      toggle: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // handleView = () => {
  //   this.setState((prevState) => {
  //     return {
  //       view: !prevState.view,
  //     };
  //   });
  // };
  handleOk = () => {
    this.setState((prevState) => {
      return {
        view: !prevState.view,
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.department,
    };

    this.props.dispatch(startPostEmployee(formData));
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
  render() {
    return (
      <div>
        {!this.state.toggle ? (
          <div className="box-container7">
            <h1 className="title1">Employee -{this.props.employees.length}</h1>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Department</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.employees.map((ele, i) => {
                  return (
                    <tr>
                      <td>{++i}</td>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.mobile}</td>
                      <td>{this.props.departments.map((ele) => ele.name)}</td>
                      <td>
                        <BrowserRouter>
                          <Link className="button5" to="/employeeView">
                            View
                          </Link>
                          <Route
                            path="/employeeView"
                            component={EmployeeView}
                          ></Route>
                        </BrowserRouter>
                      </td>
                      <td>
                        <button
                          className="button4"
                          onClick={() => {
                            this.props.dispatch(startRemoveEmployee(ele._id));
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="button6" onClick={this.handleToggle}>
              Add Employee
            </button>
          </div>
        ) : (
          <div className="box-container4">
            <h1 className="title1">Add Employee </h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name:</label>{" "}
              <input
                className="login-input"
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="email">Email:</label>{" "}
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br />
              <label htmlFor="mobile">Mobile:</label>{" "}
              <input
                className="login-input"
                type="text"
                id="mobile"
                name="mobile"
                value={this.state.mobile}
                onChange={this.handleChange}
              />
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
              <input className="button" type="submit" value="register" />
            </form>
          </div>
        )}
        {/* {this.state.view && (
          <div>
            <div className="box-container5">
              {this.props.employees.map((ele) => {
                return (
                  <div>
                    <h1>
                      {ele.name}-{ele.email}
                    </h1>
                  </div>
                );
              })}
              <hr />

              <button className="button8">All</button>
              <button className="button8">Pending</button>
              <button className="button8">completed</button>
              <hr />
              <h1>Tickets-{this.props.tickets.length}</h1>
              {this.props.tickets.map((ele) => {
                return (
                  <div className="box-container9">
                    <h2>Ticket info</h2>

                    <h4>Code:{ele.code}</h4>
                    <h4>Customer:{ele.customer}</h4>
                    <h4>Department:{ele.department}</h4>
                    <h4>Employee{ele.employee}</h4>
                    <h4>Message{ele.message}</h4>
                    <h4>Priority{ele.priority}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Employee);
