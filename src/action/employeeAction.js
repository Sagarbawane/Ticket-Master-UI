import axios from "../config/axios";
import React from "react";

export const postEmployee = (employee) => {
  return { type: "POST_EMPLOYEE", payload: employee };
};
export const editEmployee = (data, _id) => {
  return { type: "EDIT_EMPLOYEE", payload: { data, _id } };
};

export const startPostEmployee = (formData) => {
  return (dispatch) => {
    console.log(formData);
    axios
      .post("/employees", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const employee = response.data;
        console.log(employee);
        dispatch(postEmployee(employee));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const getEmployee = (data) => {
  return { type: "GET_EMPLOYEE", payload: data };
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
        const data = response.data;
        console.log(data);
        dispatch(getEmployee(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const deleteEmployee = (data) => {
  return { type: "DELETE_EMPLOYEE", payload: data };
};

export const startRemoveEmployee = (_id) => {
  return (dispatch) => {
    console.log(_id);
    axios
      .delete(`/employees/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(deleteEmployee(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const startEditEmployee = (_id, formData) => {
  return (dispatch) => {
    console.log(`${_id}`);
    console.log(`${formData}`);
    axios
      .put(`/employees/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(_id);
        console.log(data._id);
        dispatch(editEmployee(data, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
