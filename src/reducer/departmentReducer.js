const departmentReducer = (state = [], action) => {
  switch (action.type) {
    case "POST_DEPARTMENT": {
      return state.concat(action.payload);
    }
    case "EDIT_DEPARTMENT": {
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

    case "GET_DEPARTMENT": {
      return state.concat(action.payload);
    }
    case "DELETE_DEPARTMENT": {
      return state.filter((ele) => {
        return ele._id !== action.payload._id;
      });
    }
    default: {
      return [].concat(state);
    }
  }
};

export default departmentReducer;
