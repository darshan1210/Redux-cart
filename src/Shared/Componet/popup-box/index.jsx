import React, { useEffect, useState } from 'react'
import { AddToCart, totalBill } from '../../Redux/Action/Action'
import '../../../Pages/Products/Products.scss'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function PopUp ({ flag, data, checkParent }) {
  const [count, setCount] = useState(1)
  const { name, variants, extras } = data
  const [selectedcheckdata, setSelectedCheckData] = useState([])
  const [printData, setPrintData] = useState({})
  const [active, setActive] = useState('half pint')
  const [orderdata, setOrderData] = useState({})

  const cartData = useSelector(state => state.cartItems.data)

  const dispatch = useDispatch()

  function hendelchange (e) {
    const { name, checked } = e.target
    const existedItem = selectedcheckdata.find(item => item.name === name);
    (!existedItem)
      ? setExtras(name, checked)
      : updateExtras(name, checked)
  }

  const setExtras = (name) => {
    const extraObj = data.extras.find(subItem => subItem.name === name)
    setSelectedCheckData(current => [...current, extraObj])
  }
  const updateExtras = (name) => {
    setSelectedCheckData(current => current.filter(obj => {
      return obj.name !== name
    }))
  }

  useEffect(() => {
    if (data?.variants) {
      setPrintData(data.variants[0])
    }
  }, [])

  useEffect(() => {
    const findparentid = checkParent.filter((element) => element.id === data.parentId)
    const mainparent = checkParent.find((element) => element.id === findparentid[0].parent)
    const perantName = { id: mainparent.id, name: mainparent.name }

    let itemsum = 0;
    (printData?.price)
      ? itemsum += printData?.price
      : itemsum += data.price;

    (selectedcheckdata?.map((element) => element.price)).forEach(element => { itemsum += element })
    itemsum *= count

    const itemsmenu = []
    itemsmenu.push({ ...data, extras: [...selectedcheckdata], variants: printData, count, itemsum })

    setOrderData({ ...perantName, totalCount: count, totalSum: itemsum, itemsmenu })
  }, [selectedcheckdata, count, printData])

  const appendData = []
  const addToOrder = (data, cartData) => {
    if (cartData) {
      const I = cartData.findIndex((item) => item.id === data.id)

      if (I !== -1) {
        for (let index = 0; index < cartData[I].itemsmenu.length; index++) {
          if (JSON.stringify(cartData[I].itemsmenu[index].name) === JSON.stringify(data.itemsmenu[0].name) && JSON.stringify(cartData[I].itemsmenu[index].variants) === JSON.stringify(data.itemsmenu[0].variants) && cartData[I].itemsmenu[index].extras.join() === data.itemsmenu[0].extras.join()) {
            cartData[I].itemsmenu[index].count += data.itemsmenu[0].count
            cartData[I].itemsmenu[index].individualSum += data.itemsmenu[0].individualSum
            cartData[I].totalCount += data.itemsmenu[0].count
            cartData[I].totalSum += data.itemsmenu[0].individualSum
            dispatch(totalBill(orderdata.totalSum))
            flag()
            return (dispatch(AddToCart(cartData)))
          }
        }

        cartData[I].itemsmenu.push(data.itemsmenu[0])

        const countArray = cartData[I].itemsmenu.map(element => element.count)
        cartData[I].totalCount = countArray.reduce((acc, curr) => acc + curr, 0)

        const priceArray = cartData[I].itemsmenu.map(element => element.individualSum)
        cartData[I].totalSum = priceArray.reduce((acc, curr) => acc + curr, 0)

        dispatch(totalBill(orderdata.totalSum))
        flag()
        return (dispatch(AddToCart(cartData)))
      } else {
        cartData.push(data)
        dispatch(totalBill(orderdata.totalSum))
        flag()
        return (dispatch(AddToCart(cartData)))
      }
    } else {
      appendData.push(data)
      dispatch(totalBill(orderdata.totalSum))
      flag()
      return (dispatch(AddToCart(appendData)))
    }
  }

  function setData (element, name) {
    setPrintData(element)
    setActive(name)
  }

  return (

    <div className='popup_back'>
      <div className="popup">
        <div className="close_div" onClick={flag}>

        </div>
        <div className="add_to_order">

          <div className="item_details_title">
            {name}
          </div>
          <div className="hr_line"></div>
          <>
            {
              (variants) && (<>
                <div className="Size_box">
                  <div className="size_title">
                    Size
                  </div>
                  {variants.map((element, index) => {
                    const { name, price } = element
                    return (
                      <div className={active === name ? 'MainActiveBtn3' : 'Half_print'} key={index} onClick={() => setData(element, name)}>
                        <div className="Half_print_left">{name}</div>
                        <div className="Half_print_right">£ {price}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="hr_line"></div>
              </>
              )
            }
          </>
          <>
            {
              (extras) && (<>
                <div className="Select_Options">
                  <div className="Select_Options_title">
                    Select Options
                  </div>
                  {
                    extras.map((element, index) => {
                      const { name, price } = element
                      return (
                        <div className="extra_items" key={index}>
                          <div className="extra_items_title"><label htmlFor={name} className='container' >{name}</label><span className="extra_items_prize">(+£ {price})</span> </div>
                          <input type="checkbox" name={name} value={name} className="checkbox-custom" id={name} onChange={(e) => hendelchange(e)} />
                        </div>
                      )
                    })
                  }
                </div>
                <div className="hr_line"></div>
              </>)
            }
          </>

          <div className="item_add_one">
            <button className="minus" onClick={() => { (count > 1) && setCount(count - 1) }}>-</button>
            <div className="total_items">{count}</div>
            <button className="plus" onClick={() => setCount(count + 1)}>+</button>
          </div>
          <div className="addtocart">
            <button className="ADD_TO_ORDER" onClick={() => addToOrder(orderdata, cartData)} >ADD TO ORDER</button>
          </div>

        </div>

      </div>
    </div>
  )
}

PopUp.propTypes = {
  flag: PropTypes.func,
  data: PropTypes.object,
  checkParent: PropTypes.array
}
export default PopUp
