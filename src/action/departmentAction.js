import axios from "../config/axios";
import React from "react";

export const postDepartment = (department) => {
  return { type: "POST_DEPARTMENT", payload: department };
};
export const editDepartment = (data, _id) => {
  return { type: "EDIT_DEPARTMENT", payload: { data, _id } };
};

export const startPostDepartment = (formData) => {
  return (dispatch) => {
    console.log(formData);
    axios
      .post("/departments", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const department = response.data;
        console.log(department);
        dispatch(postDepartment(department));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const getDepartment = (data) => {
  return { type: "GET_DEPARTMENT", payload: data };
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
        const data = response.data;
        console.log(data);
        dispatch(getDepartment(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const deleteDepartment = (data) => {
  return { type: "DELETE_DEPARTMENT", payload: data };
};

export const startRemoveDepartment = (_id) => {
  return (dispatch) => {
    axios
      .delete(`/departments/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(deleteDepartment(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startEditDepartment = (_id, formData) => {
  return (dispatch) => {
    console.log(`${_id}`);
    console.log(`${formData}`);
    axios
      .put(`/departments/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(_id);
        console.log(data._id);
        dispatch(editDepartment(data, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
