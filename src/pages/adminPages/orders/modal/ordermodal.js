import { useState } from "react";
import { Table, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../../../api/http";

const URL = "http://localhost:8000";

function OrderModal({
  temp,
  showOrderModal,
  handleCancel,
  fetchOrders,
  currentPage,
}) {
  const [showToast, setShowToast] = useState(false);

  const handleDelivered = async () => {
    axiosInstance
      .patch(`${URL}/orders/${temp.id}`, {
        delivered: "true",
        expectAt: new Date().getTime(),
      })
      .then((response) => {
        fetchOrders(currentPage);
        setShowToast(true);
        console.log(response);
      })
      .catch((error) => console.log(error.message));

    handleCancel();
  };

  return (
    <>
      <Modal show={showOrderModal} onHide={handleCancel}>
        <Modal.Header closeButton style={{ gap: "280px" }}>
          <Modal.Title>نمایش سفارش </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <>
            <p>
              نام مشتری: {temp.username} {temp.lastname}
            </p>
            <p>آدرس:{temp.address}</p>
            <p>تلفن:{temp.phone}</p>
            <p>
              زمان ارسال:
              {`${new Date(temp?.expectAt).toLocaleDateString("fa-IR")}`}
            </p>
            <p>
              زمان ثبت سفارش:
              {`${new Date(temp?.createdAt).toLocaleDateString("fa-IR")}`}
            </p>
            <p>
              وضعیت سفارش:
              {temp.delivered === "true" ? "تحویل داده شده" : "در انتظار ارسال"}
            </p>
          </>

          <Table>
            <thead>
              <tr className="bg-light">
                <th> کالا</th>
                <th> قیمت</th>
                <th>تعداد</th>
              </tr>
            </thead>
            {temp.products.map((item) => {
              return (
                <thead key={item.id}>
                  <tr>
                    <td>{`${item.name}`}</td>
                    <td>{` ${item?.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`}</td>
                    <td>{`${item.count}`}</td>
                  </tr>
                </thead>
              );
            })}
          </Table>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "center" }}>
          {temp.delivered === "true" ? (
            <p>
              زمان تحویل:
              {`${new Date(temp?.expectAt).toLocaleDateString("fa-IR")}`}
            </p>
          ) : (
            <Button
              onClick={() => handleDelivered(temp.id)}
              variant="secondary"
            >
              ارسال
            </Button>
          )}
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
          محصول با موفقیت به واحد ارسال منتقل شد.
        </Toast.Body>
      </Toast>
    </>
  );
}

export default OrderModal;
