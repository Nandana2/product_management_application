import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addProductAPI, getSubCategoryAPI } from "../services/allAPI";

function AddProductModal({ show, handleClose, onProductAdded }) {

  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  const [variants, setVariants] = useState([
    { ram: "", price: "", qty: "" }]);

  const [images, setImages] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const fetchSubCategories = async () => {
    try {
      const result = await getSubCategoryAPI();
      if (result.status === 200) {
        setSubCategoriesList(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (show) {
      fetchSubCategories();
    }
  }, [show]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { ram: "", price: "", qty: "" }
    ]);
  }

  const handleVariantChange = (
    index,
    field,
    value
  ) => {

    const updatedVariants = [...variants];

    updatedVariants[index][field] = value;

    setVariants(updatedVariants);
  };

 const handleImageChange = (e) => {
  const files = Array.from(
    e.target.files
  )

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const hasInvalidType = files.some(file => !allowedTypes.includes(file.type));

  if (hasInvalidType) {
    toast.warning("Only jpeg, jpg, and png files are allowed");
    e.target.value = null;
    return;
  }

  setImages((prevImages) => {
    const updatedImages = [...prevImages,...files ];
    return updatedImages.slice(0, 3);
  })
}

  const handleDiscard = () => {
    setTitle("");
    setSubCategory("");
    setDescription("");
    setVariants([{ ram: "", price: "", qty: "" }]);
    setImages([]);
    handleClose();
  };

  const handleAddProduct = async () => {
    if (!title ||!subCategory ||!description) {
      toast.warning("Please fill all fields");
      return;
    }

    if (variants.length < 2) {
      toast.warning("Please add at least 2 variants");
      return;
    }

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      if (!v.ram.trim() || !v.price || !v.qty) {
        toast.warning(`Please fill all fields for Variant ${i + 1}`);
        return;
      }
    }

    try {
const formData =new FormData();
formData.append( "title",title);

      formData.append("subCategory",subCategory);
 formData.append("description",description );
formData.append("variants",JSON.stringify(variants));
images.forEach((img) => {formData.append("image",img );});
const token =sessionStorage.getItem("token");
const reqHeader = { Authorization: `Bearer ${token}`,
 "Content-Type": "multipart/form-data"
      };

      const result =await addProductAPI(
      formData,reqHeader )

      console.log(result)

      if (result.status === 200) {
        toast.success( "Product Added Successfully" )

        setTitle("");
        setSubCategory("");
        setDescription("");

        setVariants([
          {
            ram: "",
            price: "",
            qty: ""
          }
        ]);

        setImages([]);

        if (onProductAdded) {
          onProductAdded();
        }
        handleClose();
      } else {
        toast.error("Failed To Add Product");
      }

    } catch (err) {
      console.log(err);

      toast.error("Failed To Add Product");
    }
  }

  return (

    <Modal
      show={show}
      onHide={handleDiscard}
      centered
      dialogClassName="product-modal"
    >

      <Modal.Body className="product-modal-body" >

        <h2 className="modal-title-custom">
          Add Product
        </h2>

       

        <div className="custom-row">

          <label>
            Title :
          </label>

          <input  type="text"  placeholder="HP AMD Ryzen 3" value={title} onChange={(e) => setTitle(e.target.value) }/>

        </div>

      

        <div className="custom-row align-top">

          <label>
            Variants :
          </label>

          <div className="variant-container">

            {
              variants.map(
                (item,index ) => (

                  <div  className="variant-line"
                    key={index} >

                    <span>
                      Ram:
                    </span>

                    <input type="text" placeholder="4 GB" value={item.ram}  onChange={(e) =>   handleVariantChange(  index,  "ram",  e.target.value  )  } />

                    <span>
                      Price:
                    </span>

                    <input
                      type="text" placeholder="529.99" value={item.price} onChange={(e) => handleVariantChange(index,"price", e.target.value )} />

                    <span>
                      QTY:
                    </span>

                   
                   <input type="text"  placeholder="1" value={item.qty} onChange={(e) => handleVariantChange( index,"qty", e.target.value  )}/>  

                  </div>

                )
              )
            }

            <button
              type="button"
              className="variant-add-btn"
              onClick={addVariant}
            >
              Add variants
            </button>

          </div>

        </div>

       
        <div className="custom-row">
          <label>
            Sub category :
          </label>
          <select value={subCategory} onChange={(e) =>setSubCategory( e.target.value)}>
            <option value="">Select Sub category</option>
            {
              subCategoriesList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.subCategoryName}
                </option>
              ))
            }
          </select>

        </div>

       

        <div className="custom-row">

          <label>
            Description :
          </label>

          <textarea rows="3" placeholder="Description" value={description} onChange={(e) => setDescription( e.target.value )} />
                     

        </div>

       

        <div className="custom-row align-top">

          <label>
            Upload image :
          </label>

         <div className="image-upload-area">

  {images.map((image, index) => (

    <div
      className="image-box"
      key={index}
    >

      <img
        src={URL.createObjectURL(image)}
        alt=""
      />

    </div>

  ))}

  {images.length < 3 && (

    <label className="upload-box">

      +

      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

    </label>

  )}

</div>

        </div>


        <div
          className="modal-footer-custom"
        >

          <button
            className="add-product-btn"
            onClick={ handleAddProduct} >
        ADD
          </button>

          <button className="discard-btn" onClick={ handleDiscard }>
            DISCARD
          </button>

        </div>

      </Modal.Body>

    </Modal>

  );
}

export default AddProductModal;