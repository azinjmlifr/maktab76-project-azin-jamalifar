import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import DeleteModal from "./modals/deletemodal";
import { AiFillEdit, AiFillFileAdd, AiFillDelete } from "react-icons/ai";
import EditModal from "./modals/editmodal";
import AddModal from "./modals/addproductmodal";
import axios from "axios";

const URL = "http://localhost:8000/files";

const ProductsManegment = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [temp, setTemp] = useState("");
  const [editTemp, setEditTemp] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");

  let limit = 5;

  const fetchProducts = useCallback(
    async (currentPage) => {
      const res = await fetch(
        `http://localhost:8000/products?_page=${currentPage}&_limit=${limit}`
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
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    fetchProducts(currentPage);
  };

  const handleDeleteModal = (item) => {
    setTemp(item);
    setShowDeleteModal(true);
  };

  const handleEditModal = (item) => {
    setEditTemp(item.id);
    setShowEditModal(true);

    axios.get(`http://localhost:8000/products/${item.id}`).then((res) => {
      setName(res.data.name);
      setCategory(res.data.category);
      setThumbnail(res.data.thumbnail);
      setDescription(res.data.description);
      setSubcategory(res.data.subcategory);
      setQuantity(res.data.quantity);
      setPrice(res.data.price);
      setWeight(res.data.weight);
      setImage(res.data.image);
    });

    axios.get(`http://localhost:8000/category/${item.category}`).then((res) => {
      setCategoryName(res.data.name);
    });
    console.log(categoryName);
  };

  const handleAddModal = () => {
    setShowAddModal(true);
  };

  return (
    <div style={{ height: "500px" }}>
      {showAddModal && (
        <AddModal
          setShowAddModal={setShowAddModal}
          showAddModal={showAddModal}
          currentPage={currentPage}
          fetchProducts={fetchProducts}
        />
      )}

      <Button
        onClick={() => handleAddModal()}
        style={{ margin: "20px" }}
        variant="secondary"
      >
        افزودن کالا
        <AiFillFileAdd />
      </Button>

      <Table
        striped
        bordered
        style={{
          textAlign: "center",
          marginRight: "350px",
          border: "2px #679FF1 solid",
        }}
        className="w-50 "
      >
        <thead>
          <tr className="head">
            <th>تصویر</th>
            <th>نام کالا</th>
            <th>دسته بندی</th>
            <th>ویرایش-حذف</th>
          </tr>
        </thead>

        {items.length > 0
          ? items?.map((item, i) => (
              <thead key={i}>
                <tr id={item.id}>
                  <td>
                    <img
                      src={`${URL}/${item.image}`}
                      alt="product images"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </td>

                  <td>{item?.name}</td>
                  <td>{`${item?.category}`}</td>
                  {/* <td>{`${item?.category}/${item?.subcategory}`}</td> */}
                  <td>
                    <DeleteModal
                      temp={temp}
                      showDeleteModal={showDeleteModal}
                      setShowDeleteModal={setShowDeleteModal}
                      fetchProducts={fetchProducts}
                      currentPage={currentPage}
                    />
                    <EditModal
                      editTemp={editTemp}
                      showEditModal={showEditModal}
                      setShowEditModal={setShowEditModal}
                      name={name}
                      setName={setName}
                      image={image}
                      setImage={setImage}
                      thumbnail={thumbnail}
                      setThumbnail={setThumbnail}
                      description={description}
                      setDescription={setDescription}
                      price={price}
                      setPrice={setPrice}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      weight={weight}
                      setWeight={setWeight}
                      category={category}
                      setCategory={setCategory}
                      subcategory={subcategory}
                      setSubcategory={setSubcategory}
                      currentPage={currentPage}
                      fetchProducts={fetchProducts}
                    />
                    <div>
                      <Button
                        onClick={() => handleEditModal(item)}
                        variant="secondary"
                        style={{ marginLeft: "5px" }}
                      >
                        <AiFillEdit />
                      </Button>
                      <Button
                        onClick={() => {
                          handleDeleteModal(item);
                        }}
                        variant="secondary"
                        style={{ marginLeft: "5px" }}
                      >
                        <AiFillDelete />
                      </Button>
                    </div>
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

export default ProductsManegment;
