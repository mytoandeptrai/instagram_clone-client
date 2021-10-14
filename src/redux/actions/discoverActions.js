import { getDataAPI } from "../../utils/fetchData";
import { DISCOVER_TYPES } from "../types/discoverTypes";
import { NOTIFY_TYPES } from "../types/notifyTypes";

export const getDiscoverPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DISCOVER_TYPES.LOADING,
        payload: true,
      });

      const res = await getDataAPI("post_discover", token);

      dispatch({
        type: DISCOVER_TYPES.GET_POSTS,
        payload: res.data,
      });

      dispatch({
        type: DISCOVER_TYPES.LOADING,
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

export const getMorePostDiscover = ({ page, auth }) => {
  return async (dispatch) => {
    try {
      const res = await getDataAPI(`post_discover?num=${page * 9}`, auth.token);
      dispatch({
        type: DISCOVER_TYPES.UPDATE_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
