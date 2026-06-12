import React from 'react'
import { FaHeart, FaTrash } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseURL'
import { addWishlistAPI, deleteProductAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function ProductCard({
  product,
  onWishlistUpdated,
  onProductDeleted
}) {

  const imageUrl =
    product?.image?.length > 0
      ? `${BASE_URL}/uploads/${product.image[0]}`
      : "https://pngimg.com/uploads/laptop/laptop_PNG101816.png"

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to add products to wishlist");
      return;
    }

    try {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const result = await addWishlistAPI({ productId: product._id }, reqHeader);

      if (result.status === 200) {
        toast.success("Product added to wishlist successfully");
        if (onWishlistUpdated) {
          onWishlistUpdated();
        }
      } else if (result.status === 406) {
        toast.info("Product is already in your wishlist");
      } else {
        toast.error("Failed to add product to wishlist");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to delete products");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };

      const result = await deleteProductAPI(product._id, reqHeader);

      if (result.status === 200) {
        toast.success("Product deleted successfully");
        if (onProductDeleted) {
          onProductDeleted();
        }
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  return (

    <div className="product-card">

      <div className="wishlist" onClick={handleAddToWishlist}>
        <FaHeart />
      </div>

      <div className="delete-btn" onClick={handleDeleteProduct} style={{ position: 'absolute', left: '15px', top: '15px', background: '#ff4d4d', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', zIndex: 5, transition: 'all 0.3s ease' }}>
        <FaTrash size={14} />
      </div>

      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit"  }}
      >

        <img src={imageUrl} alt="" />

        <h6>
          {product.title}
        </h6>

        <h5>
          $
          {
            product.variants?.[0]
              ?.price
          }
        </h5>

        <div className="stars" style={{ color: '#b5b5b5', display: 'flex', gap: '3px', marginTop: '8px', fontSize: '14px' }}>
          ★★★★★
        </div>

      </Link>

    </div>

  )
}

export default ProductCard