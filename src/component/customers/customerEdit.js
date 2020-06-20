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

import { findCustomer } from "../../selectors/customerSelectors";
import { startEditCustomer } from "../../action/customerAction";

class customerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.customers._id,
      email: props.customers.email,
      name: props.customers.name,
      edit: false,
    };
  }

  handleEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
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
  handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
    };
    console.log(formData);
    console.log(this.props.customers);
    const _id = this.state.id;
    this.props.dispatch(startEditCustomer(_id, formData));
    this.props.history.push(`/customers`);
  };

  render() {
    return (
      <div className="box-container4">
        <h1 className="title1">Edit Customers </h1>
        &nbps; &nbps; &nbps;
        <Form onSubmit={this.handleEditSubmit}>
          <FormGroup row>
            <Label htmlFor="name" sm={1} size="lg">
              Name:
            </Label>{" "}
            <Col sm={10}>
              <Input
                bsSize="lg"
                type="text"
                id="name"
                placeholder="Name"
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
                bsSize="lg"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEditChange}
              />
            </Col>
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
    customers: findCustomer(state.customers, props.match.params.id),
  };
};

export default connect(mapStateToProps)(customerEdit);
