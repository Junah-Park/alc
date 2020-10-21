import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper navbarMain">            
          <img src="./images/flask.ico" width="50" height="50"></img>
          <a href="https://github.com/Junah-Park/alc"><img src="./images/github.png" alt="Github" width="50" height="50"></img></a>
            <Link
              to="/"
              style={{
                fontFamily: "Helvetica, Arial"
              }}
              className="col s5 brand-logo center white-text"
            >
              alc
            </Link>              
            <Link
              to="/register"
              style={{
                width: "100px",
                borderRadius: "5px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-small right waves-effect waves-light hoverable blue accent-3 registerButton"
            >
              Register
            </Link>
            <Link
                to="/login"
                style={{
                  width: "100px",
                  borderRadius: "5px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-small right btn-flat waves-effect black white-text"
              >
                Log In
              </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
