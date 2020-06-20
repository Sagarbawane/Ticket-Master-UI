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
import { startEditTicket } from "../../action/ticketAction";

class EditTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.tickets.id,
      code: this.props.tickets.code,
      customer: props.tickets.customer,
      department: props.tickets.department,
      employee: props.tickets.employees,
      priority: props.tickets.priority,
      message: props.tickets.message,
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
      employee: { _id: this.state.employee },
      message: this.state.message,
      priority: this.state.priority,
    };
    const _id = this.props.tickets._id;
    this.props.dispatch(startEditTicket(_id, formData));
    this.props.history.push("/ticket");
  };
  render() {
    let { priority } = this.state;
    console.log(this.state.employee);
    return (
      <div className="box-container4">
        <h1 className="title1">Edit Customers </h1>
        &nbsp; &nbsp; &nbsp;
        <Form onSubmit={this.handleEditSubmit}>
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
                onChange={this.handleEditChange}
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
                onChange={this.handleEditChange}
              >
                {this.props.customers.map((ele) => {
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
                onChange={this.handleEditChange}
              >
                {this.props.departments.map((ele) => {
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
                onChange={this.handleEditChange}
              >
                {this.props.employees.map((ele) => {
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
                onChange={this.handleEditChange}
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
    tickets: state.tickets.find(
      (ticket) => ticket._id === props.match.params.id
    ),
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
  };
};

export default connect(mapStateToProps)(EditTicket);
