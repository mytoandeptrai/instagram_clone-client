import { POSTMODAL_TYPES } from "../types/postModalTypes";

const initialState = false;

const postModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTMODAL_TYPES.ISMODAL:
      return action.payload;
    default:
      return state;
  }
};

export default postModalReducer;
