import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";
import { findEmployee } from "../../selectors/employeeSelector";
import { startEditEmployee } from "../../action/employeeAction";

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.employees._id,
      name: props.employees.name,
      email: props.employees.email,
      edit: false,
    };
  }

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
    const _id = this.state.id;
    this.props.dispatch(startEditEmployee(_id, formData));
    this.props.history.push(`/employee`);
  };

  render() {
    return (
      <div className="box-container4">
        <h1 className="title1">Edit Employee </h1>
        &nbsp; &nbsp; &nbsp;
        <Form onSubmit={this.handleEditSubmit}>
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
                onChange={this.handleEditChange}
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
                onChange={this.handleEditChange}
              />
            </Col>
          </FormGroup>
          <br />
          <br />
          <Button color="success" type="submit" value="update">
            UPDATE
          </Button>
          <Button color="success" onClick={this.handleCancle}>
            CANCLE
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    employees: findEmployee(state.employees, props.match.params.id),
    departments: state.departments,
  };
};

export default connect(mapStateToProps)(EmployeeEdit);
