import React from "react";
import { connect } from "react-redux";
import { startEditTicket } from "../action/ticketAction";

class TicketView extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      customer: "",
      department: "",
      employee: "",
      message: "",
      priority: "high",
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
  handleSelectChange = (event) => {
    this.setState({ priority: event.target.value });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employee: this.state.employee,
      message: this.state.message,
      priority: this.state.priority,
    };
    console.log(formData);
    const _id = this.props.tickets.map((ele) => ele._id);
    this.props.dispatch(startEditTicket(_id, formData));
    this.setState((prevState) => {
      return {
        edit: !prevState.edit,
      };
    });
  };

  render() {
    let { priority } = this.state;
    return (
      <div className="box-container5">
        {this.props.tickets.map((ele) => {
          return (
            <div>
              <h3>Code:{ele.code}</h3>
              <h3>Customer:{this.props.customers.map((ele) => ele.name)}</h3>
              <h3>
                Department:{this.props.departments.map((ele) => ele.name)}
              </h3>
              <h3>Employee:{this.props.employees.map((ele) => ele.name)}</h3>
              <h3>Message:{ele.message}</h3>
              <h3>Priority:{ele.priority}</h3>
              <button className="button5" onClick={this.handleEdit}>
                Edit
              </button>
            </div>
          );
        })}
        <hr />

        {this.state.edit && (
          <div className="box-container11">
            <h1 className="title1">Edit Customers </h1>
            <form onSubmit={this.handleEditSubmit}>
              <label htmlFor="code">Code:</label>{" "}
              <input
                className="login-input3"
                type="code"
                id="code"
                name="code"
                value={this.state.code}
                onChange={this.handleEditChange}
              />
              <br />
              <label htmlFor="customer">Customer:</label>{" "}
              <select
                className="login-input2"
                type="customer"
                id="customer"
                name="customer"
                value={this.state.customer}
                onChange={this.handleEditChange}
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
                onChange={this.handleEditChange}
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
                onChange={this.handleEditChange}
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
                onChange={this.handleEditChange}
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

export default connect(mapStateToProps)(TicketView);
