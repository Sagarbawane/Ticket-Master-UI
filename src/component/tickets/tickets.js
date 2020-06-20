import React from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";
import { startAddTicket } from "../../action/ticketAction";
import { startGetTicket } from "../../action/ticketAction";
import { startDeleteTicket } from "../../action/ticketAction";

import { Link, Route, BrowserRouter } from "react-router-dom";

class Tickets extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      customer: "",
      department: "",
      employees: {},
      message: "",
      priority: "high",
      toggle: false,
    };
  }
  componentDidMount() {
    if (this.props.tickets.length == 0) {
      this.props.dispatch(startGetTicket());
    }
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
      employees: { _id: this.state.employees },
      message: this.state.message,
      priority: this.state.priority,
    };

    this.props.dispatch(startAddTicket(formData));
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };
  handleShow = (id) => {
    this.props.history.push(`ticket/${id}`);
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
            <Button color="info">Pending</Button>{" "}
            <Button color="info">Completed</Button>
            <h1 className="title1">Ticket -{this.props.tickets.length}</h1>
            <Table>
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
                {this.props.tickets.map((ticket) => {
                  console.log(this.props.tickets);

                  console.log(ticket);
                  console.log(ticket.employees);
                  const employee = ticket.employees.find((ele) => ele);
                  console.log(employee);

                  return (
                    <tr>
                      <td>{ticket.code}</td>

                      <td>
                        {" "}
                        {this.props.customers.map((ele) => {
                          console.log(ele._id);
                          return ele._id === ticket.customer && ele.name;
                        })}
                      </td>

                      <td>
                        {" "}
                        {this.props.departments.map((ele) => {
                          return ele._id === ticket.department && ele.name;
                        })}
                      </td>

                      <td>
                        {this.props.employees !== 0 &&
                          this.props.employees.find(
                            (ele) => ele._id == employee._id
                          ).name}
                      </td>

                      <td>{ticket.message}</td>
                      <td>{ticket.priority}</td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => {
                            this.handleShow(ticket._id);
                          }}
                        >
                          SHOW
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => {
                            this.props.dispatch(startDeleteTicket(ticket._id));
                          }}
                        >
                          REMOVE
                        </Button>
                      </td>

                      <td>
                        <input
                          type="checkbox"
                          checked={ticket.isResolved}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button color="info" size="lg" block onClick={this.handleToggle}>
              ADD TICKET
            </Button>
          </div>
        ) : (
          //ADD TICKET
          <div className="box-container4">
            <h1 className="title1">Add Ticket </h1>
            &nbsp; &nbsp; &nbsp;
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="code" sm={1} size="lg">
                  Code:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    type="code"
                    id="code"
                    name="code"
                    value={this.state.code}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label htmlFor="customer" sm={1} size="lg">
                  Customer:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    type="select"
                    id="customer"
                    name="customer"
                    value={this.state.customer}
                    onChange={this.handleChange}
                  >
                    {this.props.customers.map((ele) => {
                      console.log(this.props.customers);
                      console.log(ele._id);
                      console.log(this.state.customer);
                      return <option value={ele._id}>{ele.name}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label htmlFor="department" sm={1} size="lg">
                  Department:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    onChange={this.handleChange}
                  >
                    {this.props.departments.map((ele) => {
                      console.log(ele._id);
                      console.log(this.state.department);
                      return <option value={ele._id}>{ele.name}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label htmlFor="employees" sm={1} size="lg">
                  Employee:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    type="select"
                    id="employees"
                    name="employees"
                    value={this.state.employees}
                    onChange={this.handleChange}
                  >
                    {this.props.employees.map((ele) => {
                      console.log(this.props.employees);
                      console.log(this.state.department);
                      console.log(ele.department);
                      console.log(ele.department == this.state.department);
                      return (
                        ele.department == this.state.department && (
                          <option value={ele._id}>{ele.name}</option>
                        )
                      );
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label sm={1} size="lg">
                  Message:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    name="message"
                    type="textarea"
                    bsSize="lg"
                    value={this.state.message}
                    onChange={this.handleChange}
                  ></Input>
                </Col>
              </FormGroup>
              <br />
              <FormGroup tag="fieldset">
                <legend>Priority:</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="Priority-option"
                      value="high"
                      checked={priority === "high"}
                      onChange={this.handleSelectChange}
                    />
                    HIGH
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="Priority-option"
                      value="medium"
                      checked={priority === "medium"}
                      onChange={this.handleSelectChange}
                    />
                    MEDIUM
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="Priority-option"
                      value="low"
                      checked={priority === "low"}
                      onChange={this.handleSelectChange}
                    />
                    LOW
                  </Label>
                </FormGroup>
              </FormGroup>
              <br />

              <Button color="success" type="submit" value="register">
                Register
              </Button>
            </Form>
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
export default connect(mapStateToProps)(Tickets);
