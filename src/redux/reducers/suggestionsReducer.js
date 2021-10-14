import { SUGGESTION_TYPES } from "../types/suggestionTypes";

const initialState = {
  loading: false,
  users: [],
  result: 9,
  page: 2,
};

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTION_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGESTION_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        result: action.payload.result,
      };
    case SUGGESTION_TYPES.UPDATE_USERS:
      return {
        ...state,
        users: action.payload.users,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default suggestionsReducer;
