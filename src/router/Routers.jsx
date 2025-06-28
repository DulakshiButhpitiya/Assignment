import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductList from '../components/ProductList';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};

export default Routers;
