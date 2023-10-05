import React, { useState } from 'react';
import style from './FilterCategory.module.css';

const FilterCategory = ({ allCategories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <div className={style.selectStyle}>
      <span>Filter by Category:</span>
      <select className={style.selectStyle} value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All Categories</option>
        {allCategories.map((category) => (
          <option key={category.id} value={category.categoria}>
            {category.categoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCategory;
