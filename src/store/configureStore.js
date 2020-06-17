import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducer/userReducer";
import customerReducer from "../reducer/customerReducer";
import departmentReducer from "../reducer/departmentReducer";
import employeeReducer from "../reducer/employeeReducer";
import ticketReducer from "../reducer/ticketReducer";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      userInfo: userReducer,
      customers: customerReducer,
      departments: departmentReducer,
      employees: employeeReducer,
      tickets: ticketReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
export default configureStore;
