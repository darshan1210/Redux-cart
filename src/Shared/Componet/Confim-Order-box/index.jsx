import React from 'react'
import '../../../Pages/Checkout/Checkout.scss'
import thumb from '../../../assets/img/thumbs_up.png'
import { useDispatch } from 'react-redux'
import { clearCart, clearTotal } from '../../Redux/Action/Action'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function Confirm ({ flag }) {
  const dispatch = useDispatch()
  const naviagte = useNavigate()
  const { t } = useTranslation()
  const EmptyCart = () => {
    dispatch(clearCart())
    dispatch(clearTotal())
    naviagte('/')
    flag()
  }
  return (
        <>
            <div className="confirm_order_page">
          <div className="main_confirm_order">
            <div className="confirm_order_title">{t('confirmOrder')}</div>
            <img className='thumb_up' src={thumb} alt="" />
            <div className="Confirm_description">
               {t('confirmMessage')}
            </div>
            <div className="final_btns">
                <button className="cancel_btn" onClick={flag}>{t('cancel')}</button>
                <button className="place_order" onClick={EmptyCart}>{t('placeOrder')}</button>
            </div>
          </div>
        </div>
        </>
  )
}
Confirm.propTypes = {
  flag: PropTypes.func
}

export default Confirm
