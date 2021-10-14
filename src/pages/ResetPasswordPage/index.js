import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import AppStoreIcon from "../../assets/images/applestore.png";
import Forgot from "../../assets/images/forgotPassword.svg";
import GoogleIcon from "../../assets/images/googlestore.png";
import { resetPasswordAction } from "../../redux/actions/authActions";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
const ResetPasswordPage = () => {
  const { token } = useParams();
  const initialState = {
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialState);
  const [typePass, setTypePass] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.cf_password) {
      return dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: "Your password doesn't match with confirm password" },
      });
    }

    dispatch(resetPasswordAction({ password: data.password, token, history }));
    setData(initialState);
  };

  return (
    <>
      <div className="forgot-container">
        <div className="forgot-content">
          <div className="forgot-input">
            <div className="forgot-input-logo">
              <span className="material-icons forgot-input-icon">password</span>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit}
              className="forgot-input-form"
            >
              <h1 className="forgot-input-heading">Reset your password</h1>
              <p className="forgot-input-desc">
                Enter your password and confirm password{" "}
                <span>to reset your account password.</span>
              </p>

              <div className="instagram-form-input" id="password">
                <label htmlFor="" className="instagram-form-label">
                  <input
                    type="password"
                    className="input-login input-login-password"
                    aria-label="Password"
                    aria-required="true"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <span className="instagram-label-text">Password</span>
                </label>
              </div>

              <div className="instagram-form-input" id="password">
                <label htmlFor="" className="instagram-form-label">
                  <input
                    type="password"
                    className="input-login input-login-password"
                    aria-label="Confirm Password"
                    aria-required="true"
                    placeholder="Confirm Password"
                    name="cf_password"
                    value={data.cf_password}
                    onChange={handleInputChange}
                  />
                  <span className="instagram-label-text">Confirm Password</span>
                </label>
              </div>

              <button
                className="forgot-input-btn"
                style={{
                  opacity: data.password && data.cf_password ? "1" : "0.5",
                }}
                disabled={data.password && data.cf_password ? false : true}
              >
                Send login link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
