import React, { useEffect, useState } from 'react'
import './Checkout.scss'
import { FiChevronLeft } from 'react-icons/fi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Confirm from '../../Shared/Componet/Confim-Order-box'
import { useTranslation } from 'react-i18next'

function Checkout () {
  const naviagte = useNavigate()
  const [orderFlag, setOrderFlag] = useState(false)
  const totalBill = useSelector(state => state.TotalBill.data)
  const [totalPrice, setTotalPrice] = useState((totalBill) || 0)
  const [totalItem, setTotalItem] = useState(0)
  const cartItems = useSelector(state => state.cartItems.data)
  const { t } = useTranslation()
  function ConfirmOrder () {
    setOrderFlag(!orderFlag)
  }
  useEffect(() => {
    (cartItems)
      ? setTotalItem(cartItems.map((item) => item.totalCount).reduce((acc, curr) => acc + curr, 0))
      : setTotalItem(0);
    (totalBill)
      ? setTotalPrice(totalBill)
      : setTotalPrice(0)
  }, [totalBill])
  console.log(cartItems)
  return (
    <>
      <div className='main_container'>
        <div className="app">
          <div className="main">
            <span className="back_icon" onClick={() => naviagte('/')}>
              <FiChevronLeft />
            </span>
            <span className="page_heading">
              {t('checkout')}
            </span>
            <span className="three_dot">
              <HiOutlineDotsHorizontal />
            </span>
          </div>
          <div className="Checkout_page_title">
            Kempston Hammers Sports & Social Club
          </div>
          <div className="Checkout_page_discription">
            {t('restaurantAddress1')} <br />{t('restaurantAddress2')}
          </div>

          <div className="cart_items">
            {(cartItems !== undefined && cartItems.length !== 0)
              ? (cartItems?.map((data, index) => {
                  return (
                  <div key={index}>
                    <div className="item_title" key={index}>
                      {cartItems[index].name}
                      ({cartItems[index].totalCount})
                    </div>
                    {
                      cartItems[index].itemsmenu?.map((data, index) => {
                        const { name, count, variants, extras, itemsum } = data
                        const temp = extras.map((e) => e.name)

                        return (
                          <div className="items" key={index}>
                            <div className="item_left">
                              <span className="item_left_up">{count} x {name}</span>
                              {(variants || temp) ? <div className='item_left_down'>{variants.name} - {temp.toString()}</div> : <span className='noData'></span>}
                            </div>
                            <div className="item_right">£{itemsum.toFixed(2)}</div>
                          </div>
                        )
                      }
                      )
                    }
                  </div>
                  )
                }
                ))
              : (<div className='empty_cart'>
                  <h3 >{t('YourCartisEmpty')}</h3>
              </div>)
            }

          </div>

          <div className="hr_line"></div>

          <div className="add_notes">
            <div className="add_notes_title">
            {t('addNotes')}
            </div>
            <textarea className='add_notes_box' type="textareas" name="text" />
          </div>

          <div className="hr_line"></div>

          <div className="Table_number">
            <div>
              <span className="Table_number_title">{t('tableNumber')}:</span>
              <span className="table_number">32</span>
            </div>
          </div>

            {
              (cartItems !== undefined && cartItems.length !== 0) && (<div className="Confirm_order" onClick={() => ConfirmOrder()}>
              <div className="Confirm_order_title">{t('confirmOrder')}</div>
              <span className="Confirm_order_view">
                £ {totalPrice.toFixed(2)} /  {totalItem} {t('items')}
              </span>
            </div>)
            }

          {(orderFlag) && <Confirm flag={ConfirmOrder} />}
        </div>
      </div>
    </>
  )
}
export default Checkout
