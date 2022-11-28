/* eslint-disable no-unused-vars */
import { ADD_TO_CART } from './Action_type'

const appendData = []

export const AddToCart = (data, cartData) => {
  if (cartData) {
    const I = cartData.findIndex((item) => item.id === data.id)
    if (I !== -1) {
      for (let index = 0; index < cartData[I].itemsmenu.length; index++) {
        if (JSON.stringify(cartData[I].itemsmenu[index].name) === JSON.stringify(data.itemsmenu[0].name) && JSON.stringify(cartData[I].itemsmenu[index].variants) === JSON.stringify(data.itemsmenu[0].variants) && cartData[I].itemsmenu[index].extras.join() === data.itemsmenu[0].extras.join()) {
          cartData[I].itemsmenu[index].count += data.itemsmenu[0].count
          cartData[I].itemsmenu[index].individualSum += data.itemsmenu[0].individualSum
          cartData[I].totalCount += data.itemsmenu[0].count
          cartData[I].totalSum += data.itemsmenu[0].individualSum
          return {
            type: ADD_TO_CART,
            payload: cartData
          }
        }
      }

      cartData[I].itemsmenu.push(data.itemsmenu[0])

      const countArray = cartData[I].itemsmenu.map(element => element.count)
      cartData[I].totalCount = countArray.reduce((acc, curr) => acc + curr, 0)

      const priceArray = cartData[I].itemsmenu.map(element => element.individualSum)
      cartData[I].totalSum = priceArray.reduce((acc, curr) => acc + curr, 0)
      return {
        type: ADD_TO_CART,
        payload: cartData
      }
    } else {
      appendData.push(data)
      return {
        type: ADD_TO_CART,
        payload: appendData
      }
    }
  } else {
    appendData.push(data)
    return {
      type: ADD_TO_CART,
      payload: appendData
    }
  }
}

let appendBill = 0
export const totalBill = (data) => {
  appendBill += data
  return {
    type: 'TOTAL_BILL',
    payload: appendBill
  }
}
