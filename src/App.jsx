import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Checkout from './Pages/Checkout'
import Product from './Pages/Products'

function App () {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Product /> } />
    <Route path='/checkout' element={<Checkout /> } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
