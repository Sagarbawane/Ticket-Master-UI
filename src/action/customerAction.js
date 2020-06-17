import axios from "../config/axios";
import React from "react";

export const setCustomer = (customerInfo) => {
  return { type: "SET_CUSTOMER", payload: customerInfo };
};
export const editCustomer = (data, _id) => {
  return { type: "EDIT_CUSTOMER", payload: { data, _id } };
};
export const getCustomer = (customer) => {
  return { type: "GET_CUSTOMER", payload: customer };
};
export const startGetCustomer = (_id) => {
  return (dispatch) => {
    console.log(`${_id}`);
    axios
      .get(`/customers/:${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const customer = response.data;
        console.log(customer);
        dispatch(getCustomer(customer));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startEditCustomer = (_id, formData) => {
  return (dispatch) => {
    console.log(`${_id}`);
    console.log(`${formData}`);
    axios
      .put(`/customers/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(_id);
        console.log(data._id);
        dispatch(editCustomer(data, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startCustomers = (formData) => {
  return (dispatch) => {
    axios
      .post("/customers", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("err")) {
          return response.data;
        } else {
          axios
            .get("/customers", {
              headers: {
                "x-auth": localStorage.getItem("authinfo"),
              },
            })
            .then((response) => {
              const customerInfo = response.data;

              console.log(customerInfo);
              dispatch(setCustomer(customerInfo));
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const handleRemove = (customer, _id) => {
  return { type: "REMOVE", payload: { customer, _id } };
};

export const startRemoveCustomer = (_id) => {
  return (dispatch) => {
    console.log(`${_id}`);
    axios
      .delete(`/customers/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const customer = response.data;
        dispatch(handleRemove(customer, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
