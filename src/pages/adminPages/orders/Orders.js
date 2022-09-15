import { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import { GiShoppingBag } from "react-icons/gi";
import OrderModal from "./modal/ordermodal";
import styles from "../../../styles/style.module.css";

const URL_delivered = "http://localhost:8000/orders?delivered=true";
const URL_notdelivered = "http://localhost:8000/orders?delivered=false";

const Order = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [temp, setTemp] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let limit = 2;

  const fetchOrders = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `${URL_delivered}?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
      setCurrentPage(currentPage);
    },
    [limit]
  );
  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchOrders(currentPage);
  };

  const handleOrderModal = (item) => {
    setTemp(item);
    setShowOrderModal(true);
  };

  const handleChange = (event) => {
    if (event.target.value === "false") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_notdelivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    } else if (event.target.value === "true") {
      const fetchData = async () => {
        const DataResource = await fetch(URL_delivered);
        const data = await DataResource.json();
        setItems(data);
      };
      fetchData();
    }
  };

  return (
    <div style={{ height: "500px" }}>
      <form onChange={(event) => handleChange(event)}>
        <div style={{ margin: "10px", display: "inline-flex" }}>
          <p>در انتظار ارسال</p>
          <input value="false" type="radio" name="radio" />
        </div>
        <div style={{ margin: "10px", display: "inline-flex" }}>
          <p>تحویل داده شده</p>
          <input value="true" type="radio" name="radio" />
        </div>
      </form>
      <Table
        striped
        bordered
        style={{
          backgroundColor: "white",

          textAlign: "center",
          marginRight: "340px",
        }}
        className="w-50"
      >
        <thead>
          <tr>
            <th>نام کاربر</th>
            <th>زمان ثبت سفارش</th>
            <th>مجموع مبلغ</th>
            <th>وضعیت سفارش</th>
            <th>بررسی سفارش ها</th>
          </tr>
        </thead>

        {items.length > 0
          ? items?.map((item, i) => (
              <thead key={i}>
                <tr id={item.id}>
                  <td>{`${item?.username} ${item?.lastname}`}</td>
                  <td>{`${new Date(item?.createdAt).toLocaleDateString(
                    "fa-IR"
                  )}`}</td>
                  <td>{` ${item?.prices
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</td>
                  <td>
                    {item.delivered === "true"
                      ? "تحویل داده شده"
                      : "در انتظار ارسال"}
                  </td>
                  <td>
                    {showOrderModal && (
                      <OrderModal
                        temp={temp}
                        showOrderModal={showOrderModal}
                        setShowOrderModal={setShowOrderModal}
                        fetchOrders={fetchOrders}
                        currentPage={currentPage}
                        handleCancel={() => setShowOrderModal(false)}
                      />
                    )}
                    <Button
                      onClick={() => handleOrderModal(item)}
                      variant="secondary"
                    >
                      {" "}
                      بررسی سفارش
                      <GiShoppingBag />
                    </Button>
                  </td>
                </tr>
              </thead>
            ))
          : null}
      </Table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Order;
