import axios from "../config/axios";
import React from "react";

export const Customer = (customer) => {
  return { type: "ADD_CUSTOMER", payload: customer };
};

export const startGetCustomer = () => {
  return (dispatch) => {
    axios
      .get("/customers", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const customer = response.data;
        dispatch(Customer(customer));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startGetAddCustomer = (formData) => {
  return (dispatch) => {
    axios
      .post("/customers", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        // console.log('data', response.data)
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          const customer = response.data;
          dispatch(Customer(customer));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const setDeleteCustomer = (id) => {
  return { type: "DELETE_CUSTOMER", payload: id };
};

export const startDeleteCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`/customers/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const customer = response.data;
        dispatch(setDeleteCustomer(customer._id));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const setEditCustomer = (customer) => {
  return { type: "EDIT_CUSTOMER", payload: customer };
};

export const startEditCustomer = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`/customers/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          const customer = response.data;
          dispatch(setEditCustomer(customer));
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
};
