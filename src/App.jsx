import React from 'react';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">🛍️ Product Catalog</h1>
      <ProductList />
    </div>
  );
};

export default App;
