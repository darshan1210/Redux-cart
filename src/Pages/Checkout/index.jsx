/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react'
import './Checkout.scss'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Checkout () {
  const naviagte = useNavigate()
  const getData = useSelector((state) => state.cartItems.CartData)
  const gettotal = useSelector((state) => state.cartItems.totalQnty)
  const getTotalPrize = useSelector((state) => state.cartItems.totalPrize)
  const getItems = useSelector((state) => state.cartItems.CartData)
  const itemCount = useSelector((state) => state.cartItems.itemcount)
  const checkprint = useSelector((state) => state.cartItems.checkPrint)
  const tempcount = itemCount
  console.log(tempcount)

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
            <div className="item_title">
              Items(3)
            </div>
            {getItems.map((element, index) => {
              const { name, price } = element
              return (
                <div className="items" key={index}>
                  <div className="item_left">
                    <span className="item_left_up">{tempcount} x {name}</span>
                    <div className="item_left_down">{checkprint}</div>
                  </div>
                  <div className="item_right">${price}</div>
                </div>
              )
            })}

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

          <div className="Confirm_order" >
            <div className="Confirm_order_title">confirm order</div>
            <span className="Confirm_order_view">
              $0 / {gettotal} ITEM
            </span>
          </div>

          {/* <div className="confirm_order">
          <div className="main_confirm_order">
            <div className="confirm_order_title">Confirm Order</div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  )
}
export default Checkout
