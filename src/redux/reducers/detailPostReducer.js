import { editData } from "../types/globalTypes";
import { POST_TYPES } from "../types/postTypes";

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];
    case POST_TYPES.UPDATE_POST:
      return editData(state, action.payload._id, action.payload);
    default:
      return state;
  }
};

export default detailPostReducer;
