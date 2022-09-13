import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../redux/product/ProductSlice";
import Toast from "react-bootstrap/Toast";

export default function DeleteModal({
  temp,
  showDeleteModal,
  setShowDeleteModal,
  fetchProducts,
  currentPage,
}) {
  const [showToast, setShowToat] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShowDeleteModal(false);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .then(unwrapResult)
      .then(() => {
        setShowDeleteModal(false);
        setShowToat(true);
        fetchProducts(currentPage);
      });
  };

  return (
    <>
      <Modal show={showDeleteModal}>
        <Modal.Title style={{ margin: "10px" }}>حذف محصول</Modal.Title>

        <Modal.Body>آیا مایل به حذف محصول هستید؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            انصراف
          </Button>
          <Button variant="danger" onClick={() => handleDelete(temp.id)}>
            حذف
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
          محصول با موفقیت حذف شد.
        </Toast.Body>
      </Toast>
    </>
  );
}
