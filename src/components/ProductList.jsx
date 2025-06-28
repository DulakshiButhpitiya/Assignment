import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ProductCard from './ProductCard';
import Header from './Header.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', image: null });
  const [editId, setEditId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category || 'All'))];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      if (formData.image) data.append('image', formData.image);

      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated');
      } else {
        await axios.post('http://localhost:5000/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product created');
      }

      setFormData({ name: '', price: '', image: null });
      setEditId(null);
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const handleEdit = product => {
    setFormData({ name: product.name, price: product.price, image: null });
    setEditId(product._id);
    setShowModal(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
    <Header />
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8 mt-20">🛍️ Product Catalog</h1>

      <div className="mb-6">
        <button
          onClick={() => { setEditId(null); setFormData({ name: '', price: '', image: null }); setShowModal(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          ➕ Add New Product
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-4">
              <input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                name="price"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                className="border p-2 rounded"
                required
              />
              <input
                name="image"
                type="file"
                onChange={handleChange}
                className="border p-2 rounded"
                accept="image/*"
                required={!editId}
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editId ? 'Update' : 'Save'}
                </button>
                <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
