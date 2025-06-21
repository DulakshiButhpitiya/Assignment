import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import productsData from '../data/products.json';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [...new Set(productsData.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
