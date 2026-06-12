import React, { useState, useEffect } from 'react'
import { FaTimes, FaRegTimesCircle, FaChevronRight, FaRegHeart } from "react-icons/fa";
import { getWishlistAPI, deleteWishlistAPI } from '../services/allAPI'
import { BASE_URL } from '../services/baseURL'
import { toast } from 'react-toastify'

function WishlistDrawer({
    showWishlist,
    setShowWishlist,
    onWishlistUpdated
}) {

    const [wishlistItems, setWishlistItems] = useState([])

    const fetchWishlist = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            };
            const result = await getWishlistAPI(reqHeader);
            if (result.status === 200) {
                setWishlistItems(result.data);
            }
        } catch (err) {
            console.log("Error fetching wishlist:", err);
        }
    }

    useEffect(() => {
        if (showWishlist) {
            fetchWishlist();
        }
    }, [showWishlist])

    if (!showWishlist) return null

    const removeItem = async (id) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`
            };
            const result = await deleteWishlistAPI(id, reqHeader);
            if (result.status === 200) {
                toast.success("Item removed from wishlist");
                fetchWishlist();
                if (onWishlistUpdated) {
                    onWishlistUpdated();
                }
            } else {
                toast.error("Failed to remove item");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to remove item");
        }
    }

    return (
        <>
            <div
                className="wishlist-overlay"
                onClick={() => setShowWishlist(false)}
            />

            <div className="wishlist-drawer">

                <div className="wishlist-header" onClick={() => setShowWishlist(false)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#003f66', color: 'white' }}>

                    <div className="wishlist-title" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className="wishlist-circle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'white', color: '#003f66' }}>
                            <FaRegHeart style={{ fontSize: '20px' }} />
                        </span>

                        <h4 style={{ margin: 0, fontWeight: '500' }}>Items</h4>
                    </div>

                    <FaChevronRight
                        style={{ cursor: "pointer", fontSize: '20px' }}
                    />

                </div>

                {
                    wishlistItems.length > 0 ?
                    wishlistItems.map((item) => {
                        const product = item.productId;
                        if (!product) return null;

                        const imageUrl = product.image && product.image.length > 0
                            ? `${BASE_URL}/uploads/${product.image[0]}`
                            : "https://pngimg.com/uploads/laptop/laptop_PNG101816.png";

                        return (
                            <div
                                key={item._id}
                                className="wishlist-item"
                                style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderBottom: '1px solid #ddd' }}
                            >
                                <div style={{ width: '80px', height: '80px', border: '1px solid #ddd', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', padding: '5px', flexShrink: 0 }}>
                                    <img
                                        src={imageUrl}
                                        alt=""
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>

                                <div className="wishlist-info" style={{ flex: 1 }}>
                                    <h6 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: '600', color: '#003f66' }}>{product.title}</h6>
                                    <h5 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700', color: '#333' }}>₹{product.variants?.[0]?.price}</h5>
                                    <div className="stars" style={{ color: '#bbb', fontSize: '12px' }}>
                                        ★★★★★
                                    </div>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeItem(item._id)
                                    }
                                    style={{ background: 'none', border: 'none', color: '#003f66', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', outline: 'none' }}
                                >
                                    <FaRegTimesCircle style={{ fontSize: '22px' }} />
                                </button>
                            </div>
                        );
                    })
                    :
                    <h5 style={{ textAlign: 'center', marginTop: '30px', color: '#777' }}>
                        Wishlist is empty
                    </h5>
                }

            </div>
        </>
    )
}

export default WishlistDrawer