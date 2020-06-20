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
import { startLoginUser } from "../../action/userAction";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
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
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      return this.props.history.push("/dashboard");
    };
    this.props.dispatch(startLoginUser(formData, redirect));
  };
  render() {
    return (
      <div className="box-container4">
        <h1 className="title1">Login </h1>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Form onSubmit={this.handleSubmit}>
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
          <Button color="success" size="lg" type="submit" value="login">
            LOGIN
          </Button>
        </Form>
      </div>
    );
  }
}
export default connect()(Login);
