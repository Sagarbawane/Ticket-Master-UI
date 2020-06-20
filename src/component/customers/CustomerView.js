import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { Link, Route, BrowserRouter } from "react-router-dom";
import { findCustomer } from "../../selectors/customerSelectors";
import { startEditCustomer } from "../../action/customerAction";
import TicketInfo from "./ticketInfo";

class CustomerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  handleEdit = (id) => {
    this.props.history.push(`/customers/edit/${id}`);
  };

  render() {
    console.log(this.state.edit);
    console.log(this.props.customers);
    return (
      <div className="box-container4">
        <div>
          <h1>
            {this.props.customers.name}-{this.props.customers.email}
          </h1>
          <Button
            color="primary"
            onClick={() => {
              this.handleEdit(this.props.customers._id);
            }}
          >
            EDIT
          </Button>
        </div>

        <hr />

        <br />

        <Button outline color="primary">
          ALL
        </Button>
        <Button outline color="primary">
          PENDING
        </Button>
        <Button outline color="primary">
          COMPLETED
        </Button>
        <hr />
        <h1>Tickets-{this.props.tickets.length} </h1>

        <BrowserRouter>
          <Button color="warning">
            {" "}
            <Link className="button4" to="/ticketinfo">
              TICKET INFO
            </Link>
          </Button>
          <Route path="/ticketinfo" component={TicketInfo}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    customers: findCustomer(state.customers, props.match.params.id),

    tickets: state.tickets,
  };
};

export default connect(mapStateToProps)(CustomerView);
