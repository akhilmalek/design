import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ReactTable from "react-table";

const Product = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);

  type item = {
    id: number;
    title: String;
    body: String;
  };

  useEffect(() => {
    // Replace this URL with your API endpoint
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${
          currentPage + 1
        }&_limit=${pageSize}`
      )
      .then((response) => {
        setData(response.data);
        // Extract the total page count from the response headers
        const totalPages = Math.ceil(
          Number(response.headers["x-total-count"]) / pageSize
        );
        setPageCount(totalPages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row gx-3">
            <div className="col-lg-12 col-md-12">
              <div>
                <h2>Paginated Table from API</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item: any, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
