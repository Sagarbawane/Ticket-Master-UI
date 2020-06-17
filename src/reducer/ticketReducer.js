const ticketReducer = (state = [], action) => {
  switch (action.type) {
    case "POST_TICKET": {
      return state.concat(action.payload);
    }
    case "DELETE_TICKET": {
      return state.filter((ele) => {
        return ele._id !== action.payload._id;
      });
    }
    case "EDIT_TICKET": {
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
    default: {
      return [].concat(state);
    }
  }
};
export default ticketReducer;
