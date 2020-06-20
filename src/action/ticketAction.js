import axios from "../config/axios";
import React from "react";

export const EditTicket = (data, _id) => {
  return { type: "EDIT_TICKET", payload: { data, _id } };
};

export const startEditTicket = (_id, formData) => {
  return (dispatch) => {
    console.log(`${_id}`);
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
        dispatch(EditTicket(data, _id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Ticket = (ticket) => {
  return { type: "ADD_TICKET", payload: ticket };
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
        const ticket = response.data;
        dispatch(Ticket(ticket));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startAddTicket = (formData) => {
  return (dispatch) => {
    axios
      .post("/tickets", formData, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const ticket = response.data;
        console.log(ticket);
        dispatch(Ticket(ticket));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const DeleteTicket = (id) => {
  return { type: "DELETE_TICKET", payload: id };
};

export const startDeleteTicket = (id) => {
  return (dispatch) => {
    axios
      .delete(`/tickets/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const ticket = response.data;
        dispatch(DeleteTicket(ticket._id));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
