import { STATUS_TYPES } from "../types/statusTypes";

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case STATUS_TYPES.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
