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
import { Link, Route, BrowserRouter } from "react-router-dom";
import { startAddEmployee } from "../../action/employeeAction";
import { startGetEmployee } from "../../action/employeeAction";
import { startDeleteEmployee } from "../../action/employeeAction";
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
  componentDidMount() {
    if (this.props.employees.length == 0) {
      this.props.dispatch(startGetEmployee());
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleShow = (id) => {
    this.props.history.push(`/employee/${id}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.department,
    };

    this.props.dispatch(startAddEmployee(formData));
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
            <Table>
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
                {this.props.employees.map((employee, i) => {
                  console.log(this.props.employees);
                  console.log(employee.department);
                  console.log(this.props.departments);
                  return (
                    <tr>
                      <td>{++i}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.mobile}</td>
                      <td>
                        {" "}
                        {this.props.departments.map((ele) => {
                          console.log(ele.name);
                          console.log(employee.department);
                          console.log(ele._id);
                          console.log(ele._id === employee.department);
                          return ele._id == employee.department && ele.name;
                        })}
                      </td>
                      <td>
                        <Button
                          color="success"
                          onClick={() => {
                            this.handleShow(employee._id);
                          }}
                        >
                          SHOW
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => {
                            this.props.dispatch(
                              startDeleteEmployee(employee._id)
                            );
                          }}
                        >
                          REMOVE
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button color="info" size="lg" block onClick={this.handleToggle}>
              ADD EMPLOYEE
            </Button>
          </div>
        ) : (
          //ADD EMPLOYEE
          <div className="box-container4">
            <h1 className="title1">Add Employee </h1>
            &nbsp; &nbsp; &nbsp;
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" sm={1} size="lg">
                  Name:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    bsSize="lg"
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label htmlFor="email" sm={1} size="lg">
                  Email:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    placeholder="Email"
                    bsSize="lg"
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <br />

              <FormGroup row>
                <Label htmlFor="mobile" sm={1} size="lg">
                  Mobile:
                </Label>{" "}
                <Col sm={10}>
                  <Input
                    placeholder="Mobile"
                    bsSize="lg"
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                  />
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
                      return <option value={ele._id}>{ele.name}</option>;
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <br />

              <Button type="submit" color="success" value="register">
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
    employees: state.employees,
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Employee);
