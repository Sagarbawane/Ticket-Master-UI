import axios from "../config/axios";
import React from "react";

export const Department = (department) => {
  return { type: "ADD_DEPARTMENT", payload: department };
};

export const startGetDepartment = () => {
  return (dispatch) => {
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        console.log(response);
        const department = response.data;
        dispatch(Department(department));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startAddDepartment = (formData) => {
  return (dispatch) => {
    axios
      .post("/departments", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const department = response.data;
        console.log(department);
        dispatch(Department(department));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const EditDepartment = (department) => {
  return { type: "EDIT_DEPARTMENT", payload: department };
};

export const startEditDepartment = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`/departments/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const department = response.data;
        dispatch(EditDepartment(department));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const DeleteDepartment = (id) => {
  return { type: "DELETE_DEPARTMENT", payload: id };
};

export const startDeleteDepartment = (id) => {
  return (dispatch) => {
    axios
      .delete(`/departments/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const department = response.data;
        dispatch(DeleteDepartment(department._id));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
