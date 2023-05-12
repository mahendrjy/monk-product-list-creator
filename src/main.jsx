import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ProductListProvider from './context/ProductListContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductListProvider>
        <App />
      </ProductListProvider>
    </BrowserRouter>
  </React.StrictMode>
)
