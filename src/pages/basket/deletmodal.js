import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function DeleteOrderModal({temp,setShowDeleteModal,showDeleteModal,total}) {
    const [showToast, setShowToat] = useState(false);
    const handleClose = () => setShowDeleteModal(false);

    const handleDelete = (elem)=>{

        const carts = JSON.parse(localStorage.getItem("basketCount"));
        const filtered = carts.filter((item) => item.id !== elem.id);
        localStorage.setItem("basketCount", JSON.stringify(filtered));
        document.getElementById(`${elem.id}`).remove();
        console.log(elem);
        const totalItems = document.getElementById("total");
        const updatedTotal = total - elem.price * elem.count;
        totalItems.innerText = `مجموع قیمت ${updatedTotal.toString()} تومان `;
        setShowDeleteModal(false);
        JSON.parse(localStorage.getItem("basketCount"));
      }
console.log(temp);
  return (
    <div>
        <Modal show={showDeleteModal}>
        <Modal.Title style={{ margin: "10px" }}>حذف محصول</Modal.Title>

        <Modal.Body>آیا مایل به حذف سفارش هستید؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            انصراف
          </Button>
          <Button variant="danger" onClick={() => handleDelete(temp)}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast style={{position:"absolute" , top:"150px" , left:"50px"}} show={showToast} onClose={() => setShowToat(false)} delay={3000} autohide>
        <Toast.Header style={{gap:"200px"}}>مدیریت گالری مون</Toast.Header>
        <Toast.Body style={{color:"red"}}>سفارش با موفقیت حذف شد.</Toast.Body>
      </Toast>
    </div>
  )
}

export default DeleteOrderModal