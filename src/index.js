import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store/configureStore";
import { startGetUser } from "./action/userAction";

const store = configureStore();
console.log("object", store.getState());

store.subscribe(() => {
  return console.log(store.getState());
});
if (localStorage.getItem("authinfo")) {
  store.dispatch(startGetUser());
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
