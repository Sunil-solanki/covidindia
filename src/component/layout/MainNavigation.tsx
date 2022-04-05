import { useState } from "react";
import "./MainNavigation.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/covid-logo.png";

const MainNavigation = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg header">
        <div className="container-fluid">
          <a className="navbar-brand logo"><img src={logo} />Covid-19 Data</a>
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">{<GiHamburgerMenu />}</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={window.location.pathname === "/home" ? "nav-link active" : "nav-link"}
                  onClick={() => navigate('home')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={window.location.pathname === "/state-data" ? "nav-link active" : "nav-link"}
                  onClick={() => navigate('state-data')}
                >
                  State Data
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={window.location.pathname === "/graph" ? "nav-link active" : "nav-link"}
                  onClick={() => navigate('graph')}
                >
                  Data Graph
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
