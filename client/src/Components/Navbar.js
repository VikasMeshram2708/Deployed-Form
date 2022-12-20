import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate("");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto active">
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link  fs-5" to="/dashboard">
                    Dashboard
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <button
                  className="fs-5 rounded btn btn-danger my-2 my-sm-0"
                  type="button"
                  onClick={() => navigate("/signUp")}
                >
                  Sign UP
                </button>
                <button
                  className="fs-5 mx-3 rounded btn btn-outline-info my-2 my-sm-0"
                  type="button"
                  onClick={() => navigate("/signIn")}
                >
                  Sing In
                </button>
              </form>
            ) : (
              <button
                className="fs-5 mx-3 rounded btn btn-danger my-2 my-sm-0"
                type="button"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {
  title: "Form",
};

export default Navbar;
