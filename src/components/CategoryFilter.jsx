import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="mb-6 flex flex-wrap gap-3">
    <button
      onClick={() => onSelectCategory('All')}
      className={`px-4 py-2 rounded-full border ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 transition`}
    >
      All
    </button>
    {categories.map(cat => (
      <button
        key={cat}
        onClick={() => onSelectCategory(cat)}
        className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 transition`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
