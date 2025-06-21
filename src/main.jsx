import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { FaBookmark, FaList, FaBed, FaUser, FaComment, FaImages } from "react-icons/fa"


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Toaster position="top-right"
    reverseOrder={false} />
  <BrowserRouter>
  <App />
  </BrowserRouter>
</React.StrictMode>
)
