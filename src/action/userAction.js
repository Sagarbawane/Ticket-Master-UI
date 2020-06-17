import axios from "../config/axios";
import React from "react";

export const setUsers = (userInfo) => {
  return { type: "SET_USER", payload: userInfo };
};

export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        const userInfo = response.data;

        dispatch(setUsers(userInfo));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startLoginUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/login", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("err")) {
          return response.data;
        } else {
          alert("you sucessfully login");
          localStorage.setItem("authinfo", response.data.token);
          axios
            .get("/users/account", {
              headers: {
                "x-auth": localStorage.getItem("authinfo"),
              },
            })
            .then((response) => {
              const userInfo = response.data;

              dispatch(setUsers(userInfo));
              redirect();
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
export const startGetLogout = () => {
  return (dispatch) => {
    axios
      .delete("/users/logout", {
        headers: {
          "x-auth": localStorage.getItem("authinfo"),
        },
      })
      .then((response) => {
        if (response.data.notice) {
          alert(response.data.notice);
          localStorage.removeItem("authinfo");
          dispatch(setUsers({}));
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startRegisteruser = (formData, redirect) => {
  return () => {
    axios
      .post("/users/register", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("err")) {
          return alert(response.data);
        } else {
          alert("you login sucessfully");
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
