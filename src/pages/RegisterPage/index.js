import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppStoreIcon from "../../assets/images/applestore.png";
import GoogleIcon from "../../assets/images/googlestore.png";
import Logo from "../../assets/images/logo.png";
import Footer from "../../components/Footer";
import { registerAction } from "../../redux/actions/authActions";
import "./index.scss";
const RegisterPage = () => {
  const initialState = {
    email: "",
    fullname: "",
    username: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, fullname, username, password } = userData;
  const [typePass, setTypePass] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction({ userData, history }));
  };

  return (
    <>
      <div className="wrapper">
        <div className="instagram-container">
          <div className="instagram-features">
            <div className="group" id="instagram-register">
              <div className="instagram-register-logo">
                <img src={Logo} alt="Logo" />
              </div>

              <p className="instagram-register-heading">
                Sign up to see photos and videos from your friends.
              </p>

              <h4 className="line">
                <span className="line-text">OR</span>
              </h4>

              <div className="instagram-register-div">
                <form className="instagram-form" onSubmit={handleSubmit}>
                  <div className="instagram-form-input">
                    <label htmlFor="" className="instagram-form-label">
                      <input
                        type="text"
                        className="input-login"
                        aria-label="Enter your email...."
                        aria-required="true"
                        placeholder="Enter your email...."
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                      />
                      <span className="instagram-label-text">
                        Enter your email....
                      </span>
                    </label>
                  </div>

                  <div className="instagram-form-input">
                    <label htmlFor="" className="instagram-form-label">
                      <input
                        type="text"
                        className="input-login"
                        aria-label="Full Name"
                        aria-required="true"
                        placeholder="Full Name"
                        name="fullname"
                        value={fullname}
                        onChange={handleInputChange}
                      />
                      <span className="instagram-label-text">Full Name</span>
                    </label>
                  </div>

                  <div className="instagram-form-input">
                    <label htmlFor="" className="instagram-form-label">
                      <input
                        type="text"
                        className="input-login"
                        aria-label="User Name"
                        aria-required="true"
                        placeholder="User Name"
                        name="username"
                        value={username.toLowerCase().replace(/ /g, "")}
                        onChange={handleInputChange}
                      />
                      <span className="instagram-label-text">User Name</span>
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
                        onChange={handleInputChange}
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

                  <button className="instagram-login" type="submit">
                    Sign Up
                  </button>
                  <br />
                </form>
              </div>

              <p className="instagram-register-desc">
                By signing up, you agree to our
                <a
                  href="https://www.facebook.com/bito.hihi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms{" "}
                </a>
                ,
                <a
                  href="https://www.facebook.com/bito.hihi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Data Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://www.facebook.com/bito.hihi/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cookies Policy
                </a>
                .
              </p>
            </div>

            <div className="group">
              <p className="not-account">Have an account ?</p>
              <p className="not-account">
                <Link to="/">Log In</Link>
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
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
