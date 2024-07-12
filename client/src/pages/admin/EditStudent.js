import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/admin/view-student-details/${id}`)
      .then((response) => {
        setInputValues(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [inputValues, setInputValues] = useState({
    name: "",
    age: "",
    class: "",
    rollnumber: "",
    gender: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };

  const validate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "required";
    }
    if (!values.age) {
      error.age = "required";
    }
    if (!values.class) {
      error.class = "required";
    }
    if (!values.rollnumber) {
      error.rollnumber = "required";
    }
    if (!values.gender) {
      error.gender = "required";
    }
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(inputValues));

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .put(`http://localhost:8000/admin/update-student-details/${id}`, inputValues)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate(`/view-student/${id}`);
          }, 3000);
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
      <div className="container-fluid p-5" style={{ backgroundColor: "#f7f7fa" }}>
        <p className="fs-5 text-center" style={{ fontFamily: "serif" }}>
          EDIT DETAILS
        </p>
        <div className="bg-white border rounded p-5 mx-auto add-student-div">
          <form>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <span className="ms-2 small" style={{ color: "red" }}>
                {formErrors.name}
              </span>
              <input
                value={inputValues.name}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                onChange={inputChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Age
              </label>
              <span className="ms-2 small" style={{ color: "red" }}>
                {formErrors.age}
              </span>
              <input
                value={inputValues.age}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="age"
                onChange={inputChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Class
              </label>
              <span className="ms-2 small" style={{ color: "red" }}>
                {formErrors.class}
              </span>
              <input
                value={inputValues.class}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="class"
                onChange={inputChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Roll Number
              </label>
              <span className="ms-2 small" style={{ color: "red" }}>
                {formErrors.rollnumber}
              </span>
              <input
                value={inputValues.rollnumber}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="rollnumber"
                onChange={inputChange}
              />
            </div>
            <label for="exampleInputPassword1" className="form-label">
              Gender
            </label>
            <span className="ms-2 small" style={{ color: "red" }}>
              {formErrors.gender}
            </span>
            <select
              value={inputValues.gender}
              className="form-select mb-3"
              aria-label="Default select example"
              name="gender"
              onChange={inputChange}
            >
              <option selected>select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit " className="btn btn-primary w-100" onClick={submit}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
