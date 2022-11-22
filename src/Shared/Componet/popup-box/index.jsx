/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import '../../../Pages/Products/Products.scss'

function PopUp ({ flag, data }) {
  const [count, setCount] = useState(1)
  const { name, variants, extras } = data
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
                                            <div className="Half_print" key={index}>
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
                                                    <input type="checkbox" name="item1" />
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
                        <button className="minus" onClick={() => setCount(count - 1)}>-</button>
                        <div className="total_items">{count}</div>
                        <button className="plus" onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <div className="addtocart">
                        <button className="ADD_TO_ORDER">ADD TO ORDER</button>
                    </div>

                </div>
            </div>
        </>
  )
}
export default PopUp
