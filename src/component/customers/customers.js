import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";

import { Link, Route, BrowserRouter } from "react-router-dom";
import { findCustomer } from "../../selectors/customerSelectors";

import { startGetAddCustomer } from "../../action/customerAction";
import { startGetCustomer } from "../../action/customerAction";
import { startDeleteCustomer } from "../../action/customerAction";
import { startEditCustomer } from "../../action/customerAction";
import CustomerView from "./CustomerView.js";

class Customer extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      name: "",
      email: "",
      mobile: "",
      view: false,
    };
  }
  componentDidMount() {
    if (this.props.customers.length == 0) {
      this.props.dispatch(startGetCustomer());
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
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
    };
    console.log(formData);
    this.props.dispatch(startGetAddCustomer(formData));
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
  handleShow = (id) => {
    this.props.history.push(`/customers/${id}`);
  };

  render() {
    console.log(this.props.customers);
    return (
      <div>
        {!this.state.toggle ? (
          <div className="box-container7">
            <h1 className="title1">Customers -{this.props.customers.length}</h1>
            <Table hover>
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
                            this.props.dispatch(startDeleteCustomer(ele._id));
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
              ADD CUSTOMER
            </Button>
          </div>
        ) : (
          //ADD CUSTOMERS
          <div className="box-container4">
            <h1 className="title1">Add Customers </h1>
            &nbsp;&nbsp;
            <Form onSubmit={this.handleSubmit}>
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
                    value={this.state.username}
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
                    bsSize="lg"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
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
                    bsSize="lg"
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup>
                <Button color="success" type="submit" value="register">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </div>
        )}
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
