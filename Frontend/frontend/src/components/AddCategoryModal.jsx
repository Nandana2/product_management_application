import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addCategoryAPI } from "../services/allAPI";
import { toast } from "react-toastify";

function AddCategoryModal({
  show,
  handleClose,
  onCategoryAdded
}) {

  const [category, setCategory] = useState("");

  const handleDiscard = () => {
    setCategory("");
    handleClose();
  };

  const handleAdd = async () => {

    if (!category) {
      toast.warning("Please enter category name");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const result = await addCategoryAPI({ categoryName: category }, reqHeader);

      if (result.status === 200) {
        toast.success("Category Added Successfully");
        setCategory("");
        if (onCategoryAdded) {
          onCategoryAdded();
        }
        handleClose();
      } else {
        toast.error(result.response?.data || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  return (

    <Modal show={show} onHide={handleDiscard} centered dialogClassName="small-modal" >

      <Modal.Body className="small-modal-body">

     <h3 className="small-modal-title">
          Add Category
        </h3>

        <input type="text" className="small-modal-input" placeholder="Enter category name" value={category} onChange={(e) =>  setCategory(e.target.value)  } />

        <div className="small-modal-buttons">

          <button  className="add-btn-small"  onClick={handleAdd} >  ADD </button>

          <button className="discard-btn-small" onClick={handleDiscard} >
            DISCARD
          </button>

        </div>

      </Modal.Body>

    </Modal>

  );
}

export default AddCategoryModal;