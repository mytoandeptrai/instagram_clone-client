import { MODAL_TYPES } from "../types/modalTypes";

const initialState = false;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_TYPES.MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default modalReducer;
