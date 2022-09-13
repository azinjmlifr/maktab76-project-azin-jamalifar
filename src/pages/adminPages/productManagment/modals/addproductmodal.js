import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@ckeditor/ckeditor5-react/";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { makeProduct } from "../../../../redux/product/ProductSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Toast from "react-bootstrap/Toast";
import axiosInstance from "../../../../api/http";

const URL = "http://localhost:8000/files";

export default function AddModal({
  showAddModal,
  setShowAddModal,
  fetchProducts,
  currentPage,
}) {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [showToast, setShowToat] = useState(false);

  const handleUploadThumb = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };

  const handleUploadImg = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setImage(res.data.filename);
    });
  };

  const handleAdd = () => {
    let postObject = {
      image: image,
      thumbnail: thumbnail,
      name: name,
      category: parseInt(category),
      subcategory: parseInt(subcategory),
      description: description,
      price: parseInt(price),
      quantity: parseInt(quantity),
      weight: parseFloat(weight).toFixed(2),
    };
    dispatch(makeProduct(postObject))
      .then(unwrapResult)
      .then(() => {
        setShowAddModal(false);
        setShowToat(true);
        fetchProducts(currentPage);
      });
  };
  return (
    <>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton style={{ gap: "320px" }}>
          <Modal.Title> افزودن کالا: </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <p>تصویر اصلی کالا:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleUploadImg(e);
              }}
            />
            <img
              style={{ width: "40px", height: "40px" }}
              src={`${URL}/${image}`}
              alt="produtImg"
            />

            <p> تصویر جدول:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleUploadThumb(e);
              }}
            />
            <img
              style={{ width: "40px", height: "40px" }}
              src={`${URL}/${thumbnail}`}
              alt="produtImg"
            />

            <p>نام کالا:</p>
            <input
              style={{ marginBottom: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p>قیمت:</p>
            <input
              value={price}
              style={{ marginBottom: "10px" }}
              type="text"
              onChange={(e) => setPrice(e.target.value)}
            />

            <p>موجودی:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {/* <p>وزن:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            /> */}
            <p>دسته بندی کالا:</p>
            <select
              value={`${category}`}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(e.target.value);
              }}
              style={{ marginBottom: "10px" }}
            >
              <option value={1}>گوشواره</option>
              <option value={2}>گردنبند</option>
              <option value={3}>دستبند</option>
              <option value={4}>انگشتر</option>
            </select>

            <div className="App" style={{ marginBottom: "10px" }}>
              <CKEditor
                editor={Editor}
                data={description}
                onReady={(editor) => {
                  console.log(editor);
                }}
                onChange={(event, editor) => {
                  setDescription(editor.getData());
                  console.log({ event, editor });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button onClick={() => handleAdd()} variant="secondary">
            ذخیره{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        style={{ position: "absolute", top: "150px", left: "50px" }}
        show={showToast}
        onClose={() => setShowToat(false)}
        delay={3000}
        autohide
      >
        <Toast.Header style={{ gap: "200px" }}>مدیریت گالری مون</Toast.Header>
        <Toast.Body style={{ color: "red" }}>
          محصول با موفقیت اضافه شد.
        </Toast.Body>
      </Toast>
    </>
  );
}
