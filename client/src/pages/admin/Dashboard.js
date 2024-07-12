import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/list-student-data")
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let totalMale = 0;
  let totalFemale = 0;
  let totalOther = 0;

  data.forEach((student) => {
    if (student.gender === "Male") {
      totalMale++;
    } else if (student.gender === "Female") {
      totalFemale++;
    } else if (student.gender === "Other") {
      totalOther++;
    }
  });

  return (
    <>
      <Navbar />
      <div className="container-fluid p-5" style={{ backgroundColor: "#f7f7fa", height: "90vh" }}>
        <p className="fs-5 text-center " style={{ fontFamily: "serif" }}>
          DASHBOARD
        </p>
        <div className="container p-5 mx-auto text-center">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className=" container-fluid bg-white border rounded text-start p-3">
                <h6 className="text-secondary">Total Students</h6>
                <p>{data.length}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className=" container-fluid bg-white border rounded text-start p-3">
                <h6 className="text-secondary">Male Students</h6>
                <p>{totalMale}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="container-fluid bg-white border rounded text-start p-3 data-div-3">
                <h6 className="text-secondary">Female Students</h6>
                <p>{totalFemale}</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="container-fluid bg-white border rounded text-start p-3 mt-sm-3">
                <h6 className="text-secondary">Others</h6>
                <p>{totalOther}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
