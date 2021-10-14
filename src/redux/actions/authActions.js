import axios from "axios";
import { postDataAPI } from "../../utils/fetchData";
import { validForm } from "../../utils/validForm";
import { AUTH_TYPES } from "../types/authTypes";
import { NOTIFY_TYPES } from "../types/notifyTypes";

export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      const res = await postDataAPI("login", data);
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });
      localStorage.setItem("firstLogin", true);
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { success: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      try {
        const res = await postDataAPI("refresh_token");
        dispatch({
          type: AUTH_TYPES.AUTH,
          payload: { token: res.data.accessToken, user: res.data.user },
        });
        dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} });
      } catch (err) {
        dispatch({
          type: NOTIFY_TYPES.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };
};

export const registerAction = ({ userData, history }) => {
  return async (dispatch) => {
    const check = validForm(userData);
    if (check.errLength > 0)
      return dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: {
          error:
            check.errMsg.email ||
            check.errMsg.fullname ||
            check.errMsg.password ||
            check.errMsg.username,
        },
      });
    try {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      const res = await postDataAPI("register", userData);
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { success: res.data.msg },
      });
      history.push("/");
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("firstLogin");

      await postDataAPI("logout");
      window.location.href = "/";
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const forgotPasswordAction = (email) => {
  return async (dispatch) => {
    try {
      const res = await postDataAPI("forgot", { email });
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { success: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};

export const resetPasswordAction = ({ password, token, history }) => {
  return async (dispatch) => {
    try {
      const res = await postDataAPI("resetPassword", { password }, token);

      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { success: res.data.msg },
      });
      history.push("/");
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
};
