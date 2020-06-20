import axios from "../config/axios";
import React from "react";

export const Employee = (employee) => {
  return { type: "ADD_EMPLOYEE", payload: employee };
};

export const startGetEmployee = () => {
  return (dispatch) => {
    axios
      .get("/employees", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const employee = response.data;
        console.log(response);
        dispatch(Employee(employee));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startAddEmployee = (formData) => {
  return (dispatch) => {
    axios
      .post("/employees", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const employee = response.data;
        console.log(employee);
        dispatch(Employee(employee));
      });
  };
};

export const EditEmployee = (employee) => {
  return { type: "EDIT_EMPLOYEE", payload: employee };
};

export const startEditEmployee = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`/employees/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const employee = response.data;
        console.log(employee);
        dispatch(EditEmployee(employee));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const DeleteEmployee = (id) => {
  return { type: "DELETE_EMPLOYEE", payload: id };
};

export const startDeleteEmployee = (id) => {
  return (dispatch) => {
    axios
      .delete(`/employees/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const employee = response.data;
        dispatch(DeleteEmployee(employee._id));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
