import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import toast, { Toaster } from "react-hot-toast";
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [inputValues, setInputvalues] = useState({
    username: "",
    password: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputvalues({ ...inputValues, [name]: value });
  };

  const validate = (values) => {
    var error = {};
    if (!values.username) {
      error.username = "required";
    } else if (!/^[a-zA-Z0-9]{5,8}$/.test(values.username)) {
      error.username = "Username must be 5-8 characters, letters and numbers only";
    }

    if (!values.password) {
      error.password = "required";
    } else if (values.password.length < 6) {
      error.password = "password must be atleast 6 character long";
    }
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      axios
        .post("http://localhost:8000/admin/login", inputValues)
        .then((response) => {
          console.log(response);
          const data = response.data;
          if (data) {
            toast.success(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.data.role);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto  p-3  container-fluid  border rounded-3 signup-div login-div">
        <h5 className="text-center">Login</h5>
        <hr />
        <form>
          <div className="mb-2">
            <label htmlFor="username" className="form-label ">
              Username
            </label>
            <span className="ms-2 small" style={{ color: "red" }}>
              {formErrors.username}
            </span>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername1"
              aria-describedby="username"
              name="username"
              onChange={inputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <span className="ms-2 small" style={{ color: "red" }}>
              {formErrors.password}
            </span>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={inputChange}
            />
          </div>
          {loading ? (
            <>
              <button type="submit" className="btn btn-primary w-100" onClick={submit}>
                <span class="spinner-border spinner-border-sm" aria-hidden="false"></span>
                <span role="status"> Loading...</span>
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn btn-primary w-100" onClick={submit}>
                Login
              </button>
            </>
          )}
        </form>
        <div className="text-center mt-1">
          <span>
            Don't have an account?
            <NavLink className="text-primary" style={{ textDecoration: "none" }} to="/signup">
              SignUp
            </NavLink>
          </span>
        </div>
      </div>
    </>
  );
}
