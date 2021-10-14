import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Phones from "../../assets/images/phones.png";
import AppStoreIcon from "../../assets/images/applestore.png";
import GoogleIcon from "../../assets/images/googlestore.png";
import "./index.scss";
import Footer from "../../components/Footer";
import { loginAction } from "../../redux/actions/authActions";
const LoginPage = () => {
  const [typePass, setTypePass] = useState(false);
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(userData));
  };

  return (
    <>
      <div className="wrapper">
        <div className="instagram-wrapper">
          <div className="instagram-content">
            <div className="instagram-content-phone">
              <img src={Phones} alt="Phone" />
            </div>

            <div className="instagram-content-continue">
              <div className="group" id="instagram-login">
                <div className="instagram-login-logo">
                  <img src={Logo} alt="Logo" />
                </div>

                <div className="instagram-login-div">
                  <form className="instagram-form" onSubmit={handleSubmit}>
                    <div className="instagram-form-input">
                      <label htmlFor="" className="instagram-form-label">
                        <input
                          type="text"
                          className="input-login"
                          aria-label="Username,Email,Password"
                          aria-required="true"
                          placeholder="Username,Email,Password"
                          name="email"
                          value={email}
                          onChange={handleChangeInput}
                        />
                        <span className="instagram-label-text">
                          Username,Email
                        </span>
                      </label>
                    </div>

                    <div className="instagram-form-input" id="password">
                      <label htmlFor="" className="instagram-form-label">
                        <input
                          type={typePass ? "text" : "password"}
                          className="input-login input-login-password"
                          aria-label="Password"
                          aria-required="true"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChangeInput}
                        />
                        <span className="instagram-label-text">Password</span>
                      </label>
                      <span
                        className="show"
                        onClick={() => setTypePass(!typePass)}
                      >
                        {typePass ? "Hide" : "Show"}
                      </span>
                    </div>

                    <button
                      className="instagram-login"
                      type="submit"
                      disabled={email && password ? false : true}
                    >
                      Log In
                    </button>
                    <br />
                    <hr className="hr-ou" />
                    <br />
                    <Link to="/forgotPassword" className="instagram-forgot">
                      Forgot Password?{" "}
                    </Link>
                  </form>
                </div>
              </div>

              <div className="group">
                <p className="not-account">Don't have an account ?</p>
                <p className="not-account">
                  <Link to="/signup">Sign up</Link>
                </p>
              </div>

              <div className="instagram-apps">
                <p className="instagram-apps-heading">Get the app</p>
                <div className="instagram-apps-download">
                  <img src={AppStoreIcon} alt="AppStore" />
                  <img src={GoogleIcon} alt="GoogleStore" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
