import { PEER_TYPES } from "../types/peerTypes";

const peerReducer = (state = null, action) => {
  switch (action.type) {
    case PEER_TYPES.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
