import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const imageUrl = `http://localhost:5000/api/products/uploads/${product.image}`; 

  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
         <p className="text-gray-600">Qty : {product.quantity}</p>
      <p className="text-gray-600">Rs. {product.price}</p>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-black hover:bg-gray-900 text-white px-3 py-1 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
