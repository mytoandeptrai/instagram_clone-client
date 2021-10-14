import { LIKES_USERS_TYPES } from "../types/likedUsersTypes";

const likedUsersReducer = (state = false, action) => {
  switch (action.type) {
    case LIKES_USERS_TYPES.IS_SHOW:
      return action.payload;
    default:
      return state;
  }
};

export default likedUsersReducer;
