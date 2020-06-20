const intialDepartment = [];

const departmentReducer = (state = intialDepartment, action) => {
  switch (action.type) {
    case "ADD_DEPARTMENT": {
      return state.concat(action.payload);
    }

    case "EDIT_DEPARTMENT": {
      return state.map((ele) => {
        if (ele._id === action.payload._id) {
          return Object.assign({}, ele, action.payload);
        } else {
          return Object.assign({}, ele);
        }
      });
    }

    case "DELETE_DEPARTMENT": {
      return state.filter((ele) => ele._id !== action.payload);
    }

    default: {
      return [].concat(state);
    }
  }
};

export default departmentReducer;
