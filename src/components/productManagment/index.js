import Table from "react-bootstrap/Table";
import styles from "../../styles/style.module.css";
import axios from "axios";
import Modal from "../productManagment/EditModal";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const ProductManagmentComponent = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const deleteProductHandeler = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/products/${e.target.id}`)
      .catch((err) => console.log(err));

    location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button>افزودن</button>
        <p>مدیریت کالاها</p>
      </div>
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>دسته بندی</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => {
            const { name, id, categoryName } = product;

            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{categoryName}</td>
                <td>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => setIsOpen(true)}
                  >
                    Open Modal
                  </button>
                  {isOpen && <Modal setIsOpen={setIsOpen} />}

                  {/* <button onClick={(e) => deleteProductHandeler(id, e)}>
                    حذف
                  </button> */}
                  <button
                    className={styles.primaryBtn}
                    onClick={(e) => {
                      setIsOpen(true);
                    }}
                  >
                    حذف
                  </button>
                  {isOpen && (
                    <Modal
                      setIsOpen={setIsOpen}
                      deleteProductHandeler={deleteProductHandeler()}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZe
        roPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};
