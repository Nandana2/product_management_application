import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import WishlistDrawer from "../components/WishlistDrawer";
import { FaRegHeart } from "react-icons/fa";
import { getSingleProductAPI, getWishlistAPI, addWishlistAPI } from "../services/allAPI";
import { BASE_URL } from "../services/baseURL";
import { toast } from "react-toastify";
import EditProductModal from "../components/EditProductModal";

function ProductDetails() {
  const { id } = useParams();
  const [showWishlist, setShowWishlist] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlistCount = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };
      const result = await getWishlistAPI(reqHeader);
      if (result.status === 200) {
        setWishlistCount(result.data.length);
      }
    } catch (err) {
      console.log("Error fetching wishlist count:", err);
    }
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const result = await getSingleProductAPI(id);
      if (result.status === 200) {
        setProduct(result.data);
        
        if (result.data.image && result.data.image.length > 0) {
          setMainImage(`${BASE_URL}/uploads/${result.data.image[0]}`);
        } else {
          setMainImage("https://pngimg.com/uploads/laptop/laptop_PNG101816.png");
        }

        if (result.data.variants && result.data.variants.length > 0) {
          setSelectedVariant(result.data.variants[0]);
        }
      }
    } catch (err) {
      console.log("Error loading product details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
    fetchWishlistCount();
  }, [id]);

  const handleAddToWishlist = async () => {
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
        fetchWishlistCount();
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

  if (loading) {
    return (
      <>
        <Navbar setShowWishlist={setShowWishlist} wishlistCount={wishlistCount} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <h3>Loading Product Details...</h3>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar setShowWishlist={setShowWishlist} wishlistCount={wishlistCount} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
          <h3>Product Not Found</h3>
          <Link to="/home" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
      </>
    );
  }

  const imageUrls = product.image && product.image.length > 0
    ? product.image.map(img => `${BASE_URL}/uploads/${img}`)
    : ["https://pngimg.com/uploads/laptop/laptop_PNG101816.png"];

  return (
    <>
      <Navbar setShowWishlist={setShowWishlist} wishlistCount={wishlistCount} />

      <WishlistDrawer
        showWishlist={showWishlist}
        setShowWishlist={setShowWishlist}
        onWishlistUpdated={fetchWishlistCount}
      />

      <EditProductModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        product={product}
        onProductUpdated={fetchProductDetails}
      />

      <div className="details-page">

        <div className="breadcrumb">
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          &nbsp; &gt; &nbsp; Product Details
        </div>

        <div className="details-container">

          <div className="image-section">

            <div className="main-image">
              <img src={mainImage} alt="" />
            </div>

            <div className="thumbnail-section">
              {imageUrls.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-box ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>

          </div>

          <div className="info-section">

            <h1>{product.title}</h1>

            <h2>${selectedVariant ? selectedVariant.price : 0}</h2>

            <div className="stock-status">
              Availability :
              <span> {selectedVariant && selectedVariant.qty > 0 ? "✔ In stock" : "❌ Out of stock"}</span>
            </div>

            <p className="stock-text">
              Hurry up! only {selectedVariant ? selectedVariant.qty : 0} product left in stock!
            </p>

            <hr />

            {product.variants && product.variants.length > 0 && (
              <div className="ram-section">

                <span>Ram :</span>

                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    className={selectedVariant && selectedVariant.ram === v.ram ? "active-ram" : ""}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v.ram}
                  </button>
                ))}

              </div>
            )}

            <div className="qty-section">

              <span>Quantity :</span>

              <button
                onClick={() =>
                  qty > 1 && setQty(qty - 1)
                }
              >
                -
              </button>

              <input type="text"   value={qty}  readOnly />

              <button
                onClick={() =>  setQty(qty + 1)
                }
              >
                +
              </button>

            </div>

            <div className="action-buttons-details">

              <button className="edit-btn" onClick={() => setShowEditModal(true)}>
                Edit Product
              </button>

              <button className="buy-btn">
                Buy It Now
              </button>

              <button
                className="wishlist-btn"
                onClick={handleAddToWishlist}
              >
                <FaRegHeart />
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;