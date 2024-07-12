import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "./signup.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Signup() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [inputValues, setInputvalues] = useState({
    username: "",
    email: "",
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

    if (!values.email) {
      error.email = "required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      error.email = "please enter valid email address";
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
      axios
        .post("http://localhost:8000/admin/register", inputValues)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
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
      <div className="mx-auto mt-5 p-3  container-fluid  border rounded-3 signup-div">
        <h5 className="text-center">Sign Up</h5>
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
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <span className="ms-2 small" style={{ color: "red" }}>
              {formErrors.email}
            </span>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
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
          <button type="submit" className="btn btn-primary w-100" onClick={submit}>
            Sign Up
          </button>
        </form>
        <div className="text-center mt-1">
          <span>
            Already have an account?{" "}
            <NavLink className="text-primary" style={{ textDecoration: "none" }} to="/login">
              Login
            </NavLink>
          </span>
        </div>
      </div>
    </>
  );
}
