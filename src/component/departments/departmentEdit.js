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
import { findDepartment } from "../../selectors/departmentSelector";
import { startEditDepartment } from "../../action/departmentAction";

class DepartmentEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.departments._id,
      name: props.departments.name,
      edit: false,
    };
  }

  handleEditChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
    };
    console.log(formData);

    const _id = this.state.id;
    this.props.dispatch(startEditDepartment(_id, formData));
    this.props.history.push(`/department`);
  };

  render() {
    return (
      <div className="box-container4">
        <h1 className="title1">Edit Department </h1>
        &nbsp; &nbsp;&nbsp;
        <Form onSubmit={this.handleEditSubmit}>
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
    departments: findDepartment(state.departments, props.match.params.id),
  };
};

export default connect(mapStateToProps)(DepartmentEdit);
