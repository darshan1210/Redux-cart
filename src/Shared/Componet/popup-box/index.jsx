/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { AddToCart } from '../../Redux/Action/Action'
import '../../../Pages/Products/Products.scss'
import { useDispatch, useSelector } from 'react-redux'
import { element } from 'prop-types'

function PopUp ({ flag, data, checkParent }) {
  const [count, setCount] = useState(1)
  const { name, variants, extras, price } = data
  const [checkdata, setCheckData] = useState([])
  const [printData, setPrintData] = useState('')
  const dispatch = useDispatch()

  function hendelchange (e) {
    const temp = e.target.value
    const temp1 = e.target.checked
    if (temp1) {
      setCheckData([...checkdata, temp])
    } else {
      const newdata = checkdata.filter((element) => element !== (temp))
      setCheckData(newdata)
    }
  }

  function addData (data) {
    const findparentid = checkParent.filter((element) => element.id === data.parentId)
    const perantName = checkParent.filter((element) => element.id === findparentid[0].parent)
    dispatch(AddToCart(perantName[0].id, perantName[0].name), count, printData, checkdata, data)
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
                        <button className="minus" onClick={() => {
                          (count > 1) && setCount(count - 1)
                        }}>-</button>
                        <div className="total_items">{count}</div>
                        <button className="plus" onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <div className="addtocart">
                        <button className="ADD_TO_ORDER" onClick={() => addData(data)}>ADD TO ORDER</button>
                    </div>

                </div>
            </div>
        </>
  )
}
export default PopUp
