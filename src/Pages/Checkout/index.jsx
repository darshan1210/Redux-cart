/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Checkout.scss'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Confirm from '../../Shared/Componet/Confim-Order-box'

function Checkout () {
  const naviagte = useNavigate()
  const mainData = useSelector((state) => state.cartItems.mainData)
  const [totalPrice, setTotalPrice] = useState(0)
  const [orderFlag, setOrderFlag] = useState(false)

  useEffect(() => {
    let sum = 0
    const totalPrice = mainData.map((element) => {
      // console.log(element.items)
      const total = element.items.map((element) =>
        element.itemData.price
      )
      return total
    })
    console.log(totalPrice)
  }, [])
  function ConfirmOrder () {
    setOrderFlag(!orderFlag)
  }
  return (
    <>
      <div className='main_container'>
        <div className="app">

          <div className="main">
            <span className="back_icon" onClick={() => naviagte('/')}>
              <FiChevronLeft />
            </span>
            <span className="page_heading">
              Checkout
            </span>
            <span className="three_dot">
              <HiOutlineDotsHorizontal />
            </span>
          </div>

          <div className="Checkout_page_title">
            Kempston Hammers Sports & Social Club
          </div>
          <div className="Checkout_page_discription">
            134 High Street, Kempston, Bedford, <br />Bedfordshire, MK42 7BN
          </div>

          <div className="cart_items">
            {
              mainData.map((element, index) => {
                const { name, items } = element
                if (name !== '') {
                  return (
                    <div key={index}>
                      <div className="item_title" key={index + 1}>
                        {name}(3)
                      </div>
                      <>
                        {items.map((element, index) => {
                          const { count, extraitems, itemData, print } = element
                          return (
                            <div className="items" key={index}>
                              <div className="item_left">
                                <span className="item_left_up">{count} x {itemData.name}</span>
                                <div className="item_left_down">{extraitems.toString()} {print.name}</div>
                              </div>
                              <div className="item_right">${itemData.price * count}</div>
                            </div>
                          )
                        })}
                      </>
                    </div>
                  )
                }
              })
            }
          </div>

          <div className="hr_line"></div>

          <div className="add_notes">
            <div className="add_notes_title">
              Add notes:
            </div>
            <textarea className='add_notes_box' type="textareas" name="text" />
          </div>

          <div className="hr_line"></div>

          <div className="Table_number">
            <div>
              <span className="Table_number_title">Table Number</span>
              <span className="table_number">32</span>
            </div>
          </div>

          <div className="Confirm_order" onClick={() => ConfirmOrder()}>
            <div className="Confirm_order_title">confirm order</div>
            <span className="Confirm_order_view">
              $0 / 0 ITEM
            </span>
          </div>
          {(orderFlag) && <Confirm flag={ConfirmOrder}/>}

        </div>
      </div>
    </>
  )
}
export default Checkout
