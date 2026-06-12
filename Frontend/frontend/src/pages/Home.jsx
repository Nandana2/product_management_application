import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import AddProductModal from '../components/AddProductModal'
import AddCategoryModal from '../components/AddCategoryModal'
import AddSubCategoryModal from '../components/AddSubCategoryModal'
import WishlistDrawer from '../components/WishlistDrawer'
import { getCategoryAPI, getSubCategoryAPI, getProductsAPI, getWishlistAPI } from '../services/allAPI'

function Home() {

  const [showProduct, setShowProduct] = useState(false)

  const [showWishlist, setShowWishlist] = useState(false)

  const [showCategory, setShowCategory] = useState(false)

  const [showSubCategory, setShowSubCategory] = useState(false)

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [limit, setLimit] = useState(10)
  const [wishlistCount, setWishlistCount] = useState(0)

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

  const fetchCategories = async () => {
    try {
      const result = await getCategoryAPI();
      if (result.status === 200) {
        setCategories(result.data);
      }
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const result = await getSubCategoryAPI();
      if (result.status === 200) {
        setSubCategories(result.data);
      }
    } catch (err) {
      console.log("Error fetching subcategories:", err);
    }
  };

  const fetchProducts = async (newLimit) => {
    const activeLimit = newLimit !== undefined ? newLimit : limit;
    try {
      const subCategoryFilter = selectedSubCategories.join(',');
      const result = await getProductsAPI(search, currentPage, subCategoryFilter, activeLimit);
      if (result.status === 200) {
        setProducts(result.data.data);
        setTotalPages(result.data.pages || 1);
        setTotalItems(result.data.total || 0);
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
    fetchProducts(newLimit);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } 
    else {
      pages.push(1, 2, 3, 4, 5);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchWishlistCount();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage, selectedSubCategories]);

  const handleSubCategoryChange = (subCategoryId) => {
    setCurrentPage(1);
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategoryId)) {
        return prev.filter((id) => id !== subCategoryId);
      } else {
        return [...prev, subCategoryId];
      }
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedSubCategories([]);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar
        setShowWishlist={setShowWishlist}
        search={search}
        setSearch={setSearch}
        wishlistCount={wishlistCount}
      />

      <div className="home-container">

        <Sidebar
          categories={categories}
          subCategories={subCategories}
          selectedSubCategories={selectedSubCategories}
          onSubCategoryChange={handleSubCategoryChange}
          onClearFilters={handleClearFilters}
        />

        <div className="product-section">

          <div className="action-buttons">

            <button
              onClick={() =>
                setShowCategory(true)
              }
            >
              Add category
            </button>

            <button
              onClick={() =>
                setShowSubCategory(true)
              }
            >
              Add sub category
            </button>

            <button
              onClick={() =>
                setShowProduct(true)
              }
            >
              Add Product
            </button>

          </div>

          <div className="product-grid">

            {
              products && products.length > 0 ?

                products.map((product) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                    onWishlistUpdated={fetchWishlistCount}
                    onProductDeleted={() => fetchProducts()}
                  />

                ))

                :

                <h4>
                  No Products Found
                </h4>
            }

          </div>

          <div className="pagination-bar">

            <span className="pagination-info">
              {Math.min((currentPage - 1) * limit + products.length, totalItems)} of {totalItems} items
            </span>

            <div className="pagination-pages">
              <button className="page-arrow" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}  disabled={currentPage === 1}
              >
                &#8249;
              </button>

              {getPageNumbers().map((page, idx) =>
                page === '...' ? 
                  <span key={`dots-${idx}`} className="page-dots">...</span>
                 : 
                  <button
                    key={page}
                    className={`page-num ${currentPage === page ? 'page-active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                
              )}

              <button
                className="page-arrow"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                &#8250;
              </button>
            </div>

            <div className="pagination-limit">
              <span>Show</span>
              <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))} className="limit-select" >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>

          </div>

        </div>

      </div>

      <AddCategoryModal
        show={showCategory}
        handleClose={() =>
          setShowCategory(false)
        }
        onCategoryAdded={fetchCategories}
      />

      <AddSubCategoryModal
        show={showSubCategory}
        handleClose={() =>
          setShowSubCategory(false)
        }
        categories={categories}
        onSubCategoryAdded={fetchSubCategories}
      />

      <AddProductModal
        show={showProduct}
        handleClose={() =>
          setShowProduct(false)
        }
        onProductAdded={fetchProducts}
      />

      <WishlistDrawer
        showWishlist={showWishlist}
        setShowWishlist={setShowWishlist}
        onWishlistUpdated={fetchWishlistCount}
      />

    </>
  )
}

export default Home