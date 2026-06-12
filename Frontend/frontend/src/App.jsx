import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Routes>
       <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />

    </BrowserRouter>
  )
}

export default App