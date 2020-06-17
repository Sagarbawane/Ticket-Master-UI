const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case "POST_EMPLOYEE": {
      return [].concat(action.payload);
    }
    case "EDIT_EMPLOYEE": {
      return state.map((ele) => {
        console.log(action.payload._id);
        if (ele._id == action.payload._id) {
          console.log(ele._id == action.payload._id);
          return Object.assign({}, ele, action.payload.data);
        } else {
          return Object.assign({}, ele);
        }
      });
    }
    case "DELETE_EMPLOYEE": {
      return state.filter((ele) => {
        return ele._id !== action.payload._id;
      });
    }
    default: {
      return [].concat(state);
    }
  }
};
export default employeeReducer;
