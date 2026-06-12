import React from 'react'
import { FaHeart } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseURL'
import { addWishlistAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function ProductCard({
  product,
  onWishlistUpdated
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

  return (

    <div className="product-card">

      <div className="wishlist" onClick={handleAddToWishlist}>
        <FaHeart />
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