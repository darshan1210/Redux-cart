/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Products.scss'
import Mainapi from '../../Shared/Utils/Utils'
import PopUp from '../../Shared/Componet/popup-box'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Product () {
  const [categories, SetCategories] = useState([])
  const [products, SetProducts] = useState([])
  const [secondParent, setSecondparant] = useState([])
  const [secondBtnData, setSecondBtnData] = useState([])
  const [pupupflag, setPopupflag] = useState(false)
  const [firstbtnactive, setFirstbtnactive] = useState(2)
  const [secondbtnactive, setSecondbtnactive] = useState(4)
  const [pupUpData, setPopUpData] = useState({})
  const [defultItems, setdefultItems] = useState({})
  const [btnTitle, setBtnTitle] = useState()

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
    Mainapi.get('Categories').then((res) => SetCategories(res.data))
    Mainapi.get('User').then((res) => SetProducts(res.data))
  }, [])

  function Firstclick (id, name) {
    setFirstbtnactive(id)
    const newtemp1 = categories.filter((element) => element.parent === id)
    setSecondparant(newtemp1)
    setdefultItems(newtemp1[0])
    setBtnTitle(name)
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
  return (
    <div className='main_container'>
      <div className="app">
        <div className="header">
          <span className='heading'>Kings Arms Cardington</span>
          <span className='Street_address'>134 High Street, Kempston, Bedford, <br />Bedfordshire, MK42 7BN</span>
        </div>
        <div className="food_type">
          {categories.map((element, index) => {
            const { id, name } = element
            return ((element.parent == null) && <button key={index} onClick={() => Firstclick(id, name)} className={firstbtnactive === id ? 'MainActive' : 'food_type_btn'} >{name}</button>)
          })}
        </div>
        <div className="stater_type">
          {
            secondParent.map((element, index) => {
              const { id, name } = element
              return (<button key={index} className={secondbtnactive === id ? 'MainActiveBtn2' : 'stater_type_btn'} onClick={() => Secondclick(id)}>{name} </button>)
            })
          }
        </div>
        <div>{(secondBtnData.length !== 0)
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

        <div className="view_basket" onClick={() => { naviagte('/checkout') }}>
          <div className="view_basket_title">view basket</div>
          <span className="count_basket_view">
          £ {totalPrice.toFixed(2)} / {totalItem} ITEM
          </span>
        </div>

        {(pupupflag) && <PopUp flag={popupdata} data={pupUpData} checkParent={categories}/>}

      </div>
    </div>
  )
}
export default Product
