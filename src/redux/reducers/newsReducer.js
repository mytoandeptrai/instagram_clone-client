import { NEW_TYPES } from "../types/newTypes";
import { editData } from "../types/globalTypes";
const initialState = {
  loading: false,
  data: [],
  sound: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_TYPES.GET_NOTIFIES:
      return { ...state, data: action.payload };
    case NEW_TYPES.CREATE_NOTIFY:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case NEW_TYPES.REMOVE_NOTIFY:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case NEW_TYPES.UPDATE_NOTIFY:
      return {
        ...state,
        data: editData(state.data, action.payload._id, action.payload),
      };
    case NEW_TYPES.DELETE_ALL_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
