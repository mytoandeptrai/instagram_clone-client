import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./index.scss";
import Forgot from "../../assets/images/forgotPassword.svg";
import { Link } from "react-router-dom";
import AppStoreIcon from "../../assets/images/applestore.png";
import GoogleIcon from "../../assets/images/googlestore.png";
import { forgotPasswordAction } from "../../redux/actions/authActions";
import Footer from "../../components/Footer";
const ForgotPasswordPage = () => {
  const { auth } = useSelector((state) => state);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!auth.user) {
      history.push("/forgotPassword");
    } else {
      history.push("/");
    }
  }, [auth, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    dispatch(forgotPasswordAction(inputValue));
    setInputValue("");
  };

  return (
    <>
      <div className="forgot-container">
        <div className="forgot-content">
          <div className="forgot-input">
            <div className="forgot-input-logo">
              <span className="material-icons forgot-input-icon">lock</span>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit}
              className="forgot-input-form"
            >
              <h1 className="forgot-input-heading">Trouble Logging In?</h1>
              <p className="forgot-input-desc">
                Enter your email, phone, or username and we'll{" "}
                <span>send you a link to get back into your account.</span>
              </p>

              <div className="instagram-form-input">
                <label htmlFor="" className="instagram-form-label">
                  <input
                    type="email"
                    className="input-login "
                    aria-label="Enter your email..."
                    aria-required="true"
                    placeholder="Enter your email..."
                    name="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <span className="instagram-label-text">Email</span>
                </label>
              </div>

              <button
                className="forgot-input-btn"
                style={{ opacity: inputValue ? "1" : "0.5" }}
                disabled={inputValue ? false : true}
              >
                Send login link
              </button>

              <hr className="hr-ou" />

              <Link to="/signup" className="forgot-input-link">
                Create New Account
              </Link>
            </form>

            <button
              className="forgot-input-btn forgot-btn-link"
              onClick={() => history.push("/")}
            >
              Back To Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
