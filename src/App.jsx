/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Checkout from './Pages/Checkout'
import Load from './Pages/Loader'
import Product from './Pages/Products'
import Mainapi from './Shared/Utils/Utils'

function App () {
  const [activePage, setActivePage] = useState(true)
  const [btnData, setBtnData] = useState()
  const [allItems, setAllItems] = useState()

  useEffect(() => {
    Mainapi.get('Categories').then((res) => setBtnData(res.data))
    Mainapi.get('User').then((res) => setAllItems(res.data))
  }, [])

  useEffect(() => {
    const loadTime = setTimeout(() => {
      setActivePage(false)
    }, 1000)
    return () => clearTimeout(loadTime)
  }, [])
  return (
    <>
      {
        (activePage)
          ? (<Load />)
          : (
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Product btndata={btnData} allitem={allItems} />} />
                <Route path='/checkout' element={<Checkout />} />
              </Routes>
            </BrowserRouter>
            )
      }

    </>
  )
}

export default App
