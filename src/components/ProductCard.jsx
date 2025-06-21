import React from 'react';

const ProductCard = ({ product }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full sm:w-64">
    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-blue-600 text-md font-bold mt-2">Rs.{product.price}</p>
    </div>
  </div>
);

export default ProductCard;
