import React from "react";
import { connect } from "react-redux";
import { startEditEmployee } from "../action/employeeAction";

class EmployeeView extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      edit: false,
    };
  }

  handleEdit = () => {
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
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

  handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
    };
    console.log(formData);
    const _id = this.props.employees.map((ele) => ele._id);
    this.props.dispatch(startEditEmployee(_id, formData));
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  };

  render() {
    return (
      <div className="box-container5">
        {this.props.employees.map((ele) => {
          return (
            <div>
              <h1>
                {ele.name}-{ele.email}
              </h1>
              <button className="button5" onClick={this.handleEdit}>
                Edit
              </button>
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
              <h3>Customer:{this.props.customers.map((ele) => ele.name)}</h3>
              <h3>
                Department:{this.props.departments.map((ele) => ele.name)}
              </h3>
              <h3>Employee:{this.props.employees.map((ele) => ele.name)}</h3>
              <h3>Message:{ele.message}</h3>
              <h3>Priority:{ele.priority}</h3>
            </div>
          );
        })}
        {this.state.edit && (
          <div className="box-container10">
            <h1 className="title1">Edit Customers </h1>
            <form onSubmit={this.handleEditSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                className="login-input2"
                type="name"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleEditChange}
              />
              <br />
              <label htmlFor=" email">Email:</label>
              <input
                className="login-input2"
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleEditChange}
              />
              <br />
              <input className="button" type="submit" value="update" />
              <button onClick={this.handleCancle} className="button">
                cancle
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    customers: state.customers,
    departments: state.departments,

    tickets: state.tickets,
  };
};

export default connect(mapStateToProps)(EmployeeView);
