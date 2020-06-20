const initialTicket = [];

const ticketReducer = (state = initialTicket, action) => {
  switch (action.type) {
    case "ADD_TICKET": {
      return state.concat(action.payload);
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

    case "DELETE_TICKET": {
      return state.filter((ele) => ele._id !== action.payload);
    }

    default: {
      return [].concat(state);
    }
  }
};

export default ticketReducer;
