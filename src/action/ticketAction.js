import axios from "../config/axios";
import React from "react";

export const postTicket = (ticket) => {
  return { type: "POST_TICKET", payload: ticket };
};

export const startPostTicket = (formData) => {
  return (dispatch) => {
    console.log(formData);
    axios
      .post("/tickets", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const ticket = response.data;
        console.log(ticket);
        dispatch(postTicket(ticket));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const getTicket = (data) => {
  return { type: "GET_TICKET", payload: data };
};

export const startGetTicket = () => {
  return (dispatch) => {
    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(getTicket(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const deleteTicket = (data) => {
  return { type: "DELETE_TICKET", payload: data };
};

export const startRemoveTicket = (_id) => {
  return (dispatch) => {
    console.log(_id);
    axios
      .delete(`/tickets/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(deleteTicket(data));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const editTicket = (data, _id) => {
  return { type: "EDIT_TICKET", payload: { data, _id } };
};

export const startEditTicket = (_id, formData) => {
  return (dispatch) => {
    console.log(`${_id}`);
    console.log(`${formData}`);
    axios
      .put(`/tickets/${_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(_id);
        console.log(data._id);
        dispatch(editTicket(data, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
