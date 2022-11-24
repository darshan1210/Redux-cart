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
  const [pupUpData, setPopUpData] = useState({})
  const [defultItems, setdefultItems] = useState({})
  const [firstbtnStyle, setFirstBtnStyle] = useState('food_type_btn')
  const [btnTitle, setBtnTitle] = useState()
  const naviagte = useNavigate()

  useEffect(() => {
    Mainapi.get('Categories').then((res) => SetCategories(res.data))
    Mainapi.get('User').then((res) => SetProducts(res.data))
  }, [])
  function Firstclick (id, name) {
    const newtemp1 = categories.filter((element) => element.parent === id)
    setSecondparant(newtemp1)
    setdefultItems(newtemp1[0])
    setBtnTitle(name)
  }
  function Secondclick (ids) {
    const newtemp2 = products.filter((element) => element.parentId === ids)
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
            return ((element.parent == null) && <button key={index} onClick={() => Firstclick(id, name)} className={firstbtnStyle}>{name}</button>)
          })}
        </div>
        <div className="stater_type">
          {
            secondParent.map((element, index) => {
              const { id, name } = element
              return (<button key={index} className="stater_type_btn" onClick={() => Secondclick(id)}>{name} </button>)
            })
          }
        </div>
        <div>
          {
            secondBtnData.map((element, index) => {
              const { name, description, price } = element
              return (
                <div className="product_info" key={index} onClick={() => popupdata(element)}>
                  <div className="product_info_left">
                    <span className="product_title">{name}</span>
                    <span className="product_Discription">{description}</span>
                  </div>
                  <div className="product_info_right">
                    <span className="product_prize">${price}</span>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className="view_basket" onClick={() => { naviagte('/checkout') }}>
          <div className="view_basket_title">view basket</div>
          <span className="count_basket_view">
            ${0} / 0 ITEM
          </span>
        </div>

        {(pupupflag) && <PopUp flag={popupdata} data={pupUpData} checkParent={categories}/>}

      </div>
    </div>
  )
}
export default Product
