/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { AddToCart, totalBill } from '../../Redux/Action/Action'
import '../../../Pages/Products/Products.scss'
import { useDispatch, useSelector } from 'react-redux'

function PopUp ({ flag, data, checkParent }) {
  const [count, setCount] = useState(1)
  const { name, variants, extras } = data
  const [selectedcheckdata, setSelectedCheckData] = useState([])
  const [printData, setPrintData] = useState({})
  const [orderdata, setOrderData] = useState({})

  const cartData = useSelector(state => state.cartItems.data)

  // const mainData = useSelector((state) => state.cartItems.mainData)

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

  const addToOrder = () => {
    dispatch(AddToCart(orderdata, cartData))
    dispatch(totalBill(orderdata.totalSum))
    flag()
  }

  return (

        <>
            <div className="popup" >
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
                                            <div className="Half_print" key={index} onClick={() => setPrintData(element)}>
                                                <div className="Half_print_left">{name}</div>
                                                <div className="Half_print_right">${price}</div>
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
                                                    <div className="extra_items_title">{name} <span className="extra_items_prize">(+$ {price})</span></div>
                                                    <input type="checkbox" name={name} value={name} onChange={(e) => hendelchange(e)}/>
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
                        <button className="ADD_TO_ORDER" onClick={addToOrder} >ADD TO ORDER</button>
                    </div>

                </div>
            </div>
        </>
  )
}
export default PopUp
