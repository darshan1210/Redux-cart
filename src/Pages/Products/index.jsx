
import React, { useEffect, useState } from 'react'
import './Products.scss'
import PopUp from '../../Shared/Componet/popup-box'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaLanguage } from 'react-icons/fa'
import Lang from '../../Shared/Componet/Languages'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Product ({ btndata, allitem }) {
  const [activePage, setActivePage] = useState(true)
  const [categories, SetCategories] = useState([])
  const [products, SetProducts] = useState([])
  const [secondParent, setSecondparant] = useState([])
  const [secondBtnData, setSecondBtnData] = useState([])
  const [pupupflag, setPopupflag] = useState(false)
  const [languageflag, setLanguageFlag] = useState(false)
  const [firstbtnactive, setFirstbtnactive] = useState(2)
  const [secondbtnactive, setSecondbtnactive] = useState(4)
  const [pupUpData, setPopUpData] = useState({})
  const [defultItems, setdefultItems] = useState({})
  const { t } = useTranslation()

  const totalBill = useSelector(state => state.TotalBill.data)

  const [totalPrice, setTotalPrice] = useState((totalBill) || 0)
  const [totalItem, setTotalItem] = useState(0)

  const cartItems = useSelector(state => state.cartItems.data)
  const naviagte = useNavigate()

  useEffect(() => {
    (cartItems)
      ? setTotalItem(cartItems.map((item) => item.totalCount).reduce((acc, curr) => acc + curr, 0))
      : setTotalItem(0);
    (totalBill)
      ? setTotalPrice(totalBill)
      : setTotalPrice(0)
  }, [totalBill])

  useEffect(() => {
    SetCategories(btndata)
    SetProducts(allitem)
  }, [])

  function Firstclick (id, name) {
    setFirstbtnactive(id)
    const newtemp1 = categories.filter((element) => element.parent === id)
    setSecondparant(newtemp1)
    setdefultItems(newtemp1[0])
  }
  function Secondclick (id) {
    setSecondbtnactive(id)
    const newtemp2 = products.filter((element) => element.parentId === id)
    setSecondBtnData(newtemp2)
  }
  useEffect(() => {
    Firstclick(2)
    Secondclick(4)
  }, [categories, products])

  useEffect(() => {
    if (defultItems) {
      const newnew = defultItems.id
      Secondclick(newnew)
    }
  }, [secondParent])

  function popupdata (data) {
    setPopUpData(data)
    setPopupflag(!pupupflag)
  }
  function langpopup () {
    setLanguageFlag(!languageflag)
  }
  useEffect(() => {
    const loadTime = setTimeout(() => {
      setActivePage(false)
    }, 3000)
    return () => clearTimeout(loadTime)
  }, [])
  return (
    <div className='main_container'>
      <div className="app">

        <div className="header">
          <span className='heading'>{t('restaurantName')}</span>
          <div className="language_btn" onClick={() => langpopup()}><FaLanguage/></div>
          <span className='Street_address'>{t('restaurantAddress1')} <br />{t('restaurantAddress2')}</span>
        </div>
        {
          (activePage)
            ? <div className="skeleton"> <Skeleton height={35}/></div>
            : <div className="food_type">
          {categories.map((element, index) => {
            const { id, name } = element
            return ((element.parent == null) && <button key={index} onClick={() => Firstclick(id, name)} className={firstbtnactive === id ? 'MainActive' : 'food_type_btn'} >{name}</button>)
          })}
        </div>
        }

        {
          (activePage)
            ? <div className="skeleton"> <Skeleton height={25}/></div>
            : <div className="stater_type">
            {
              secondParent.map((element, index) => {
                const { id, name } = element
                return (<button key={index} className={secondbtnactive === id ? 'MainActiveBtn2' : 'stater_type_btn'} onClick={() => Secondclick(id)}>{name} </button>)
              })
            }
          </div>
        }

{
          (activePage)
            ? <div className="skeleton2"> <Skeleton height={60}/>  <Skeleton height={60}/></div>
            : <div>{(secondBtnData.length !== 0)
              ? (secondBtnData.map((element, index) => {
                  const { name, description, price } = element
                  return (
                    <div className="product_info" key={index} onClick={() => popupdata(element)}>
                      <div className="product_info_left">
                        <span className="product_title">{name}</span>
                        <span className="product_Discription">{description}</span>
                      </div>
                      <div className="product_info_right">
                        <span className="product_prize">£ {price}</span>
                      </div>
                    </div>
                  )
                }))
              : (<h4 className="product_info" >This item is not Available</h4>)
              }
            </div>
        }

        <div className="view_basket" onClick={() => { naviagte('/checkout') }}>
          <div className="view_basket_title">{t('viewBasket')}</div>
          <span className="count_basket_view">
          £ {totalPrice.toFixed(2)} / {totalItem} {t('items')}
          </span>
        </div>

        {(pupupflag) && <PopUp flag={popupdata} data={pupUpData} checkParent={categories}/>}
       {(languageflag) && <Lang flag={langpopup} />}

      </div>
    </div>
  )
}
Product.propTypes = {
  btndata: PropTypes.array,
  allitem: PropTypes.array
}
export default Product
