import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addSubCategoryAPI } from "../services/allAPI";
import { toast } from "react-toastify";

function AddSubCategoryModal({
  show,
  handleClose,
  categories = [],
  onSubCategoryAdded
}) {

  const [categoryId, setCategoryId] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleDiscard = () => {
    setCategoryId("");
    setSubCategory("");
    handleClose();
  };

  const handleAdd = async () => {

    if (!categoryId || !subCategory) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const result = await addSubCategoryAPI({
        categoryId,
        subCategoryName: subCategory
      }, reqHeader);

      if (result.status === 200) {
        toast.success("Sub Category Added Successfully");
        setCategoryId("");
        setSubCategory("");
        if (onSubCategoryAdded) {
          onSubCategoryAdded();
        }
        handleClose();
      } else {
        toast.error(result.response?.data || "Failed to add sub category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add sub category");
    }
  };

  return (

    <Modal
      show={show}
      onHide={handleDiscard}
      centered
      dialogClassName="small-modal"
    >

      <Modal.Body className="small-modal-body">

        <h3 className="small-modal-title">
          Add Sub Category
        </h3>

        <select className="small-modal-input" value={categoryId} onChange={(e) =>  setCategoryId(e.target.value)  } >

          <option value=""> Select Category </option>

          {
            categories.map((item) => (

              <option key={item._id}   value={item._id} > {item.categoryName} </option>

            ))
          }

        </select>

        <input
          type="text"  className="small-modal-input"  placeholder="Enter sub category name"  value={subCategory}  onChange={(e) =>  setSubCategory(e.target.value)  } />

        <div className="small-modal-buttons">

          <button className="add-btn-small" onClick={handleAdd}>
            ADD
          </button>

          <button className="discard-btn-small" onClick={handleDiscard} >
            DISCARD
          </button>

        </div>

      </Modal.Body>

    </Modal>

  );
}

export default AddSubCategoryModal;