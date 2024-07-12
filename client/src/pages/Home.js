import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container-fluid home-div-1">
        <h1 className="text-primary fw-semibold home-text">E-SCHOOL</h1>
        <p className="fs-1 fw-semibold home-text2">Student Management Platform</p>
        <p className="fs-4 fw-normal text-secondary home-text3">
          Eschool is a simple and easy-to-access management dashboard for <br /> education,
          including schools, colleges, and universities.
        </p>
        <button type="button" class="btn btn-primary btn-lg home-button mt-2">
          Explore Now !
        </button>
      </div>
    </>
  );
}
