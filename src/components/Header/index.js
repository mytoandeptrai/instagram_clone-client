import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/instagramLogo.png";
import InputSearch from "../InputSearch";
import "./index.scss";
import Menu from "./Menu";
const Header = () => {
  return (
    <>
      <div className="navigation">
        <div className="navigation-container">
          <Link
            to="/"
            className="navigation-container-logo"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <img src={logo} alt="altLogo" />
          </Link>

          <InputSearch />
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Header;
