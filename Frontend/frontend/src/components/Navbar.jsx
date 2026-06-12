import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

function Navbar({ setShowWishlist, search, setSearch, wishlistCount = 0 }) {
    

  return (

    <div className="custom-navbar">

      <div className="search-box">

        <input type="text" placeholder="Search any things"   value={search}
  onChange={(e) => setSearch(e.target.value)}  />

        <button>
          Search
        </button>

      </div>

      <div className="nav-icons">

        <div  className="wishlist-nav"  onClick={() => setShowWishlist(true)}  style={{ cursor: 'pointer' }}
        >
          <FaHeart />
          <span className="count">{wishlistCount}</span>
        </div>

        <span className="signin-text">
          Sign In
        </span>

        <div className="cart-nav">
          <FaCartShopping />
          <span className="count">0</span>
        </div>

        <span className="cart-text">
          Cart
        </span>

      </div>

    </div>

  )
}

export default Navbar