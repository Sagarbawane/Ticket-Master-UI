import React from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { findCustomer } from "../selectors/customerSelectors";

import { startCustomers } from "../action/customerAction";
import { startGetCustomer } from "../action/customerAction";
import { startRemoveCustomer } from "../action/customerAction";
import { startEditCustomer } from "../action/customerAction";
import CustomerView from "./customerView";

class Customer extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      name: "",
      email: "",
      mobile: "",
      view: false,

      edit: false,
      customerInfo: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleView = () => {
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
    };
    console.log(formData);
    this.props.dispatch(startCustomers(formData));
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
  handleEdit = () => {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  };

  customerInfo = () => {
    this.setState((prevState) => {
      return {
        customerInfo: !prevState.customerInfo,
      };
    });
  };
  handleClose = () => {
    this.setState((prevState) => {
      return {
        customerInfo: !prevState.customerInfo,
      };
    });
  };

  handleCancle = () => {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  };
  handleEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    console.log(this.props.customers);
    return (
      <div>
        {!this.state.toggle ? (
          <div className="box-container7">
            <h1 className="title1">Customers -{this.props.customers.length}</h1>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.customers.map((ele, i) => {
                  return (
                    <tr>
                      <td>{++i}</td>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.mobile}</td>
                      <td>
                        <BrowserRouter>
                          <Link className="button5 " to="/customerView">
                            View
                          </Link>
                          <Route
                            path="/customerView"
                            component={CustomerView}
                          ></Route>
                        </BrowserRouter>
                      </td>
                      <td>
                        <button
                          className="button4"
                          onClick={() => {
                            this.props.dispatch(startRemoveCustomer(ele._id));
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
              Add Customer
            </button>
          </div>
        ) : (
          <div className="box-container4">
            <h1 className="title1">Add Customers </h1>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Name:</label>{" "}
              <input
                className="login-input"
                type="text"
                id="name"
                name="name"
                value={this.state.username}
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
              <input className="button" type="submit" value="register" />
            </form>
          </div>
        )}

        {/* {this.state.view && (
          <div>
            <div className="box-container5">
              {this.props.customers.map((ele) => {
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
const mapStateToProps = (state, props) => {
  return {
    customers: state.customers,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Customer);
