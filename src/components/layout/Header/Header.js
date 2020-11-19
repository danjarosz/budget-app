import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../../../redux/actions/auth"

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header data-test="Header" className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" data-test="link-dashboard" to="/dashboard">
            <h1 data-test="heading">Expensify</h1>
          </Link>
          <button data-test="logout-button" className="button button--link" onClick={() => dispatch(startLogout())}>Logout</button>
        </div>
      </div>
    </header>
  )
};

export default Header;
