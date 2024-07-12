import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  };

  return (
    <>
      {role === "admin" ? (
        <>
          <nav className="navbar bg-body-light border">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <NavLink className="navbar-brand ms-3 me-auto" to="/">
                E-School
              </NavLink>
              <div className="me-3  rounded d-flex justify-content-between">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "grey",
                    borderRadius: "50%",
                    padding: "1px",
                    textAlign: "center",
                  }}
                >
                  <p className="text-white" style={{ fontSize: "25px" }}>
                    A
                  </p>
                </div>
                <div style={{ width: "10px" }}></div>
                <button type="button" class="btn btn-warning btn-sm" onClick={logOut}>
                  Logout
                </button>
              </div>
              <div
                className="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    E-School
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <NavLink className="nav-link fs-5" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link fs-5" to="/dashboard">
                        Dashboard
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link fs-5" to="/student-data">
                        Student Data
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link fs-5" to="/add-student">
                        Add Student
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link fs-5" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar bg-body-light border ">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <NavLink className="navbar-brand ms-3 me-auto" to="/">
                E-School
              </NavLink>
              <div className="me-3  rounded d-flex justify-content-between">
                <NavLink type="button" className="btn btn-outline-success btn-md" to="/login">
                  Login
                </NavLink>
                <div style={{ width: "10px" }}></div>
                <NavLink type="button" className="btn btn-warning btn-md" to="/signup">
                  SignUp
                </NavLink>
              </div>
              <div
                className="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                    E-School
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <NavLink className="nav-link fs-5" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link fs-5" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link fs-5" to="/signup">
                        Signup
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
