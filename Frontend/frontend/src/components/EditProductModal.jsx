import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateProductAPI, getSubCategoryAPI } from "../services/allAPI";

function EditProductModal({ show, handleClose, product, onProductUpdated }) {
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([
    { ram: "", price: "", qty: "" }
  ]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const fetchSubCategories = async () => {
    try {
      const result = await getSubCategoryAPI();
      if (result.status === 200) {
        setSubCategoriesList(result.data);
      }
    } catch (err) {
      console.log("Error loading subcategories:", err);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setSubCategory(
        product.subCategory && typeof product.subCategory === "object"
          ? product.subCategory._id
          : product.subCategory || ""
      );
      setDescription(product.description || "");
      setVariants(
        product.variants && product.variants.length > 0
          ? product.variants
          : [{ ram: "", price: "", qty: "" }]
      );
    }
  }, [product, show]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { ram: "", price: "", qty: "" }
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleUpdateProduct = async () => {
    if (!title || !subCategory || !description) {
      toast.warning("Please fill all fields");
      return;
    }

    if (variants.length < 2) {
      toast.warning("Please add at least 2 variants");
      return;
    }

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      if (typeof v.ram !== 'string' || !v.ram.trim() || !v.price || !v.qty) {
        toast.warning(`Please fill all fields for Variant ${i + 1}`);
        return;
      }
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const updateData = {
        title,
        subCategory,
        description,
        variants
      };

      const result = await updateProductAPI(product._id, updateData, reqHeader);

      if (result.status === 200) {
        toast.success("Product Updated Successfully");
        if (onProductUpdated) {
          onProductUpdated();
        }
        handleClose();
      } else {
        toast.error("Failed To Update Product");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed To Update Product");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="product-modal"
    >
      <Modal.Body className="product-modal-body">
        <h2 className="modal-title-custom">Edit Product</h2>

        <div className="custom-row">
          <label>Title :</label>
          <input type="text" placeholder="Product Title" value={title}  onChange={(e) => setTitle(e.target.value)}  />
        </div>

    <div className="custom-row align-top">
          <label>Variants :</label>
    <div className="variant-container">
            {variants.map((item, index) => (
             <div className="variant-line" key={index}>
                <span>Ram:</span>
               <input type="text" placeholder="4 GB" value={item.ram} onChange={(e) => handleVariantChange(index, "ram", e.target.value) }/>
            <span>Price:</span>
                <input type="text" placeholder="529.99" value={item.price} onChange={(e) => handleVariantChange(index, "price", e.target.value) } />
                <span>QTY:</span>
                <input  type="text"  placeholder="1"  value={item.qty} onChange={(e) => handleVariantChange(index, "qty", e.target.value)  }  />
              </div>
            ))}
            <button  type="button" className="variant-add-btn"  onClick={addVariant}  >
              Add variants
            </button>
          </div>
        </div>

        <div className="custom-row">
          <label>Sub category :</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Select Sub category</option>
            {subCategoriesList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.subCategoryName}
           </option>
            ))}
          </select>
        </div>

        <div className="custom-row">
          <label>Description :</label>
          <textarea rows="3"placeholder="Description" value={description}  onChange={(e) => setDescription(e.target.value)}  />
        </div>

   <div className="modal-footer-custom">
          <button className="add-product-btn" onClick={handleUpdateProduct}>
            UPDATE
          </button>
          <button className="discard-btn" onClick={handleClose}>
            DISCARD
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProductModal;
