import { AUTH_TYPES } from "../types/authTypes";

const onlineReducer = (state = [], action) => {
  switch (action.type) {
    case AUTH_TYPES.ONLINE:
      return [...state, action.payload];
    case AUTH_TYPES.OFFLINE:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default onlineReducer;
