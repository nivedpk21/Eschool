import React from "react";

export default function Pagination({ totalPosts, postsPerpage, setCurrentPage, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pages.push(i);
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center pagination-sm">
          {pages.map((page, index) => (
            <li className="page-item">
              <a
                className={page == currentPage ? "page-link active" : "page-link"}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
