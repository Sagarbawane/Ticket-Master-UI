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
import { startRegisteruser } from "../../action/userAction";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push("/login");
    };
    this.props.dispatch(startRegisteruser(formData, redirect));
    this.setState({
      username: "",
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <div className="box-container4">
        <h1 className="title1">Register With Us</h1>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label sm={1} size="lg" htmlFor="username">
              Username:
            </Label>{" "}
            <Col sm={10}>
              <Input
                bsSize="lg"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <br />
          <FormGroup row>
            <Label sm={1} size="lg" htmlFor="email">
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
            <Label sm={1} size="lg" htmlFor="password">
              Password:
            </Label>{" "}
            <Col sm={10}>
              <Input
                bsSize="lg"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <br />
          <Button
            color="success"
            size="lg"
            className="button"
            type="submit"
            value="register"
          >
            REGISTER
          </Button>
        </Form>
      </div>
    );
  }
}
export default connect()(Register);
