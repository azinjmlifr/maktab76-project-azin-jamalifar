import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@ckeditor/ckeditor5-react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../../redux/product/ProductSlice";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import axiosInstance from "../../../../api/http";

const URL = "http://localhost:8000/files";

export default function EditModal({
  fetchProducts,
  currentPage,
  setShowEditModal,
  showEditModal,
  editTemp,
  image,
  setImage,
  thumbnail,
  setThumbnail,
  name,
  setName,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  weight,
  setWeight,
}) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeThumb = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setThumbnail(res.data.filename);
    });
  };

  const handleChangeImg = async (e) => {
    let formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    await axiosInstance.post("/upload", formData).then((res) => {
      return setImage(res.data.filename);
    });
  };
  const handleClose = () => setShowEditModal(false);

  const handleEdit = () => {
    let updateObject = {
      id: editTemp,
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
    setLoading(true);
    dispatch(updateProduct(updateObject))
      .then(unwrapResult)
      .then(() => {
        fetchProducts(currentPage);
        setLoading(false);
        handleClose();
        setShowToast(true);
      })
      .catch((e) => {
        console.log(e?.Message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton style={{ gap: "300px" }}>
          <Modal.Title> ویرایش کالا: </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <p>تصویر اصلی کالا:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleChangeImg(e);
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
                handleChangeThumb(e);
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
            <p>وزن:</p>
            <input
              style={{ marginBottom: "10px" }}
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <p>دسته بندی کالا:</p>
            <select
              value={`${category}/${subcategory}`}
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
          <Button
            onClick={(e) => handleEdit(e, editTemp)}
            variant="secondary"
            size="lg"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                {" "}
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                در حال پردازش...
              </>
            ) : (
              <>ذخیره</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        style={{ position: "absolute", top: "150px", left: "50px" }}
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
      >
        <Toast.Header style={{ gap: "200px" }}>مدیریت گالری مون</Toast.Header>
        <Toast.Body style={{ color: "red" }}>
          محصول با موفقیت ویرایش شد.
        </Toast.Body>
      </Toast>
    </div>
  );
}
