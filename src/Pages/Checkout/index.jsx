import React from 'react'
import './Checkout.scss'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

function Checkout () {
  return (
    <>
      <div className='main_container'>
        <div className="app">
          <div className="header">
            <span className="back_icon">
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
  <div className="items">
    <div className="item_left">

    </div>
  </div>
</div>
        </div>
      </div>
    </>
  )
}
export default Checkout
