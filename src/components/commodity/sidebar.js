import {
  Link,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getCategory } from "../../redux/category/CategorySlice";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
} from "cdbreact";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styles from "../../styles/style.module.css";

const SideBar = () => {
  const URL = "http://localhost:8000/files";
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const { category } = useSelector((state) => state.category);

  const regex = /(<([^>]+)>)/gi;
  let limit = 3;

  const fetchProducts = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `http://localhost:8000/products?_page=${currentPage}&_limit=${limit}&category=${groupId}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
      setCurrentPage(currentPage);
    },
    [limit, groupId]
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts, setSearch]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchProducts(currentPage);
    setSearch({ currentPage, limit });
  };
  console.log(items);

  return (
    <div style={{ display: "flex" }}>
      <CDBSidebar
        textColor="rgb(128, 128, 128)"
        backgroundColor="#E4EFFF"
        style={{ height: "750px" }}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <h4>محصولات سوپرمارکت</h4>
        </CDBSidebarHeader>
        {category.map((item) => (
          <>
            <Link
              id={item.id}
              style={{
                textDecoration: "none",
                color: "rgb(128, 128, 128)",
                marginTop: "40px",
              }}
              to={`${item.id}`}
            >
              <CDBSidebarContent>
                <CDBSidebarMenuItem icon="th-large">{`کالاهای گروه ${item.name}`}</CDBSidebarMenuItem>
              </CDBSidebarContent>
            </Link>
          </>
        ))}
      </CDBSidebar>

      <div
        style={{ display: "block", marginRight: "100px", marginTop: "50px" }}
      >
        {category.map((data) =>
          data.id === Number(groupId) ? (
            <div id={data.id}>
              <h2
                style={{
                  display: "flex",
                  fontSize: "30px",
                  color: "#545351",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <img
                  src={`${URL}/${data.icon}`}
                  alt="pic"
                  style={{ width: "90px", marginLeft: "50px" }}
                />
                {`کالاهای گروه ${data.name}`}
              </h2>

              {items.map((elem) =>
                elem.category === data.id ? (
                  <div
                    id={elem.id}
                    style={{
                      display: "inline-flex",
                      flexWrap: "wrap",
                      margin: "10px",
                    }}
                  >
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`${URL}/${elem.image}`}
                        style={{ width: "100%", height: "250px" }}
                      />
                      <Card.Body>
                        <Card.Title>{elem.name}</Card.Title>
                        <Card.Text>
                          قیمت:{" "}
                          {` ${elem?.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}
                        </Card.Text>
                        <Button
                          variant="outline-primary"
                          style={{ fontWeight: "bolder", color: "#233348" }}
                          onClick={() => navigate(`/productpage/${elem.id}`)}
                          size="large"
                        >
                          {" "}
                          جزییات بیشتر...
                        </Button>{" "}
                      </Card.Body>
                    </Card>
                  </div>
                ) : null
              )}
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default SideBar;
