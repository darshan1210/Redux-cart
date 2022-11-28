/* eslint-disable react/prop-types */
import React from 'react'
import '../../../Pages/Checkout/Checkout.scss'
import thumb from '../../../assets/img/thumbs_up.png'

function Confirm ({ flag }) {
  const reloadPage = () => {
    window.location.reload()
    flag()
  }
  return (
        <>
            <div className="confirm_order_page">
          <div className="main_confirm_order">
            <div className="confirm_order_title">Confirm Order</div>
            <img className='thumb_up' src={thumb} alt="" />
            <div className="Confirm_description">
                By placing this order you agree that you are present in Kings Arms and over 18 years old.
            </div>
            <div className="final_btns">
                <button className="cancel_btn" onClick={flag}>cancel</button>
                <button className="place_order" onClick={reloadPage}>place order</button>
            </div>
          </div>
        </div>
        </>
  )
}

export default Confirm
