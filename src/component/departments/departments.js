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
import { startAddDepartment } from "../../action/departmentAction";
import { startGetDepartment } from "../../action/departmentAction";
import { startDeleteDepartment } from "../../action/departmentAction";
import DepartmentView from "./departmentView";

class Departments extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      toggle: "",
      view: false,
    };
  }
  componentDidMount() {
    if (this.props.departments.length == 0) {
      this.props.dispatch(startGetDepartment());
    }
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

  handleShow = (id) => {
    this.props.history.push(`/department/${id}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
    };

    this.props.dispatch(startAddDepartment(formData));
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

            <Table>
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
                        <Button
                          color="success"
                          onClick={() => {
                            this.handleShow(ele._id);
                          }}
                        >
                          SHOW
                        </Button>
                      </td>

                      <td>
                        <Button
                          color="danger"
                          onClick={() => {
                            this.props.dispatch(startDeleteDepartment(ele._id));
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
              ADD DEPARTMENT
            </Button>
          </div>
        ) : (
          //ADD DEPARTMENTS
          <div className="box-container4 ">
            <h1 className="title1">Add Department</h1>
            &nbsp; &nbsp;&nbsp;
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" sm={1} size="lg">
                  Department:
                </Label>{" "}
                <Col sm={7}>
                  <Input
                    bsSize="lg"
                    type="name"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <br />
              <Button color="success" type="submit" value="Add">
                ADD
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
    departments: state.departments,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps)(Departments);
