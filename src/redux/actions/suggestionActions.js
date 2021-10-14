import { getDataAPI } from "../../utils/fetchData";
import { NOTIFY_TYPES } from "../types/notifyTypes";
import { SUGGESTION_TYPES } from "../types/suggestionTypes";

export const getSuggestionsAction = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SUGGESTION_TYPES.LOADING,
        payload: true,
      });

      const res = await getDataAPI("suggestionsUser", token);

      dispatch({
        type: SUGGESTION_TYPES.GET_USERS,
        payload: res.data,
      });

      dispatch({
        type: SUGGESTION_TYPES.LOADING,
        payload: false,
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
