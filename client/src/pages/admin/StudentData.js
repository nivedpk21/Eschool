import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";

export default function StudentData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/list-student-data")
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerpage, setPostsperpage] = useState(10);

  const lastPostindex = currentPage * postsPerpage;
  const firstPostindex = lastPostindex - postsPerpage;
  const currentPageposts = data.slice(firstPostindex, lastPostindex);
  return (
    <>
      <Navbar />
      <div className="container-fluid p-5" style={{ backgroundColor: "#f7f7fa", height: "100vh" }}>
        <p className="fs-5 text-center" style={{ fontFamily: "serif" }}>
          STUDENT DATA
        </p>
        <table className="table table-bordered table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              <th scope="col">SI</th>
              <th scope="col">Name</th>
              <th scope="col">Roll No</th>
              <th scope="col">Class</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {currentPageposts.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.rollnumber}</td>
                <td>{item.class}</td>
                <td className="text-center">
                  <Link
                    name=""
                    id=""
                    class="btn btn-secondary btn-sm"
                    role="button"
                    to={`/view-student/${item._id}`}
                  >
                    view
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td scope="row" colSpan="12" className="text-center">
                <Pagination
                  totalPosts={data.length}
                  postsPerpage={postsPerpage}
                  setCurrentPage={setCurrentpage}
                  currentPage={currentPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
