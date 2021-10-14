import { STATUS_TYPES } from "../types/statusTypes";

const inputReducer = (state = false, action) => {
  switch (action.type) {
    case STATUS_TYPES.ON_REPLY:
      return action.payload;
    default:
      return state;
  }
};

export default inputReducer;
