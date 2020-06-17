import React from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { startPostDepartment } from "../action/departmentAction";
import { startRemoveDepartment } from "../action/departmentAction";
import DepartmentView from "./departmentView";

class Department extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      toggle: "",
      view: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleToggle = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };
  // handleView = () => {
  //   this.setState((prevState) => {
  //     return {
  //       view: !prevState.view,
  //     };
  //   });
  // };
  // handleOk = () => {
  //   this.setState((prevState) => {
  //     return {
  //       view: !prevState.view,
  //     };
  //   });
  // };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
    };
    this.props.dispatch(startPostDepartment(formData));
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
            <h1 className="title1">
              Department -{this.props.departments.length}
            </h1>

            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.departments.map((ele) => {
                  return (
                    <tr>
                      <td>{ele.name}</td>
                      <td>
                        <BrowserRouter>
                          <Link className="button5 " to="/departmentView">
                            View
                          </Link>
                          <Route
                            path="/departmentView"
                            component={DepartmentView}
                          ></Route>
                        </BrowserRouter>
                      </td>

                      <td>
                        <button
                          className="button4 "
                          onClick={() => {
                            this.props.dispatch(startRemoveDepartment(ele._id));
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
              Add Department
            </button>
          </div>
        ) : (
          <div className="box-container6 ">
            <h1 className="title1">Add Department</h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Department:</label>{" "}
              <input
                className="login-input"
                type="name"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <input className="button" type="submit" value="Add" />
            </form>
          </div>
        )}
        {/* {this.state.view && (
          <div>
            <div className="box-container5">
              {this.props.departments.map((ele) => {
                return <h1>Name-{ele.name}</h1>;
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

                    <h3>Code:{ele.code}</h3>
                    <h3>Customer:{ele.customer}</h3>
                    <h3>Department:{ele.department}</h3>
                    <h3>Employee{ele.employee}</h3>
                    <h3>Message{ele.message}</h3>
                    <h3>Priority{ele.priority}</h3>
                    <h3>Completed:{ele.isResolved}</h3>
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
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Department);
