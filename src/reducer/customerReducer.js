const customerReducer = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case "EDIT_CUSTOMER": {
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
    case "GET_CUSTOMER": {
      return [].concat(action.payload);
    }

    case "SET_CUSTOMER": {
      return [].concat(action.payload);
    }
    case "REMOVE": {
      return state.filter((ele) => {
        return ele._id !== action.payload._id;
      });
    }
    default: {
      return [].concat(state);
    }
  }
};
export default customerReducer;
