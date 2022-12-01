/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Checkout from './Pages/Checkout'
import Load from './Pages/Loader'
import Product from './Pages/Products'
import Mainapi from './Shared/Utils/Utils'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import tEn from './assets/locales/en/translation.json'
import tGu from './assets/locales/gu/translation.json'
import tHi from './assets/locales/hi/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: tEn
      },
      gu: {
        translation: tGu
      },
      hi: {
        translation: tHi
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  })

const changeLang = (l) => {
  return () => {
    console.log('darshan')
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }
}
export const UserContext = React.createContext()
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
    const currentLang = localStorage.getItem('lang')
    i18n.changeLanguage(currentLang)
    return () => clearTimeout(loadTime)
  }, [])

  return (
    <UserContext.Provider value={changeLang}>
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

    </UserContext.Provider>
  )
}

export default App
