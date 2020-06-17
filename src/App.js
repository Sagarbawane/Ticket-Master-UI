import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./component/home";
import Register from "./component/auth/register";
import Login from "./component/auth/login";
import Dashboard from "./component/dashboard";
import { startGetLogout } from "./action/userAction";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };
  }
  handleLogout = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
    this.props.dispatch(startGetLogout());
  };
  handleOk = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle,
      };
    });
  };
  render() {
    return (
      <div className="nav">
        <BrowserRouter>
          <h1 className="logo">Ticket</h1>
          <h1 className="logo"> Master</h1>
          <Link className="button1" to="/">
            Home
          </Link>
          {Object.keys(this.props.userInfo).length !== 0 ? (
            <div>
              <Link className="button1" to="/dashboard" exact={true}>
                Account
              </Link>
              <Link className="button1" onClick={this.handleLogout} to="#">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link className="button1" to="/register">
                Register
              </Link>
              <Link className="button1" to="/login">
                Login
              </Link>
            </div>
          )}

          <Route path="/" component={Home} exact={true} />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/dashboard" component={Dashboard} exact={true} />
        </BrowserRouter>
        {this.state.toggle && (
          <div className="box-container6">
            <h1>you sucessfully logout</h1>
            <button className="button" onClick={this.handleOk}>
              ok
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
export default connect(mapStateToProps)(App);
