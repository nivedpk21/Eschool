import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./viewstudent.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ViewStudent() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/admin/view-student-details/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/admin/delete-student/${id}`)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/student-data");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container-fluid p-5" style={{ backgroundColor: "#f7f7fa", height: "90vh" }}>
        <div className="mx-auto bg-white border rounded mt-5 student-profile-div">
          <div
            style={{ height: "100px", background: "grey", textAlign: "center", padding: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="73"
              height="73"
              fill="white"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </div>
          <div className="p-4" style={{ height: "300px", textAlign: "center" }}>
            <ul class="list-group">
              <li class="list-group-item">
                <span style={{ color: "grey" }}>Full Name:</span>
                <span> {data.name}</span>
              </li>
              <li class="list-group-item">
                <span style={{ color: "grey" }}>Roll Number:</span>
                <span> {data.rollnumber}</span>
              </li>
              <li class="list-group-item">
                <span style={{ color: "grey" }}>Class:</span>
                <span> {data.class}</span>
              </li>
              <li class="list-group-item">
                <span style={{ color: "grey" }}>Age:</span>
                <span> {data.age}</span>
              </li>
              <li class="list-group-item">
                <span style={{ color: "grey" }}>Gender:</span>
                <span> {data.gender}</span>
              </li>
            </ul>

            <div className="mt-3 text-end">
              <Link type="button" className="btn btn-primary btn-sm " to={`/edit-details/${id}`}>
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm ms-auto"
                onClick={() => {
                  deleteUser(data._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
