import React from 'react'
import { FaChevronRight } from "react-icons/fa";

function Sidebar({
  categories = [],
  subCategories = [],
  selectedSubCategories = [],
  onSubCategoryChange,
  onClearFilters
}) {

  return (

    <div className="sidebar">

      <p style={{ cursor: 'pointer' }} onClick={onClearFilters}>Home</p>

      <h6>Categories</h6>

      <p style={{ cursor: 'pointer' }} onClick={onClearFilters}>All categories</p>

      {categories.map((category) => {
        const categorySubCats = subCategories.filter(
          (sub) => 
            sub.categoryId === category._id || 
            (sub.categoryId && sub.categoryId._id === category._id)
        );

        return (
          <React.Fragment key={category._id}>
            <div className="category-item">
              {category.categoryName} <FaChevronRight />
            </div>

            {categorySubCats.length > 0 && (
              <div className="subcategory">
                {categorySubCats.map((subCat) => (
                 <label key={subCat._id}>
                 <input  type="checkbox"   checked={selectedSubCategories.includes(subCat._id)}  onChange={() => onSubCategoryChange(subCat._id)} />
                  {subCat.subCategoryName}
                  </label>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}

    </div>

  )
}

export default Sidebar