/* eslint-disable no-unused-vars */
import { ADD_TO_CART } from './Action_type'

const appendData = []

export const AddToCart = (data, cartData) => {
  // console.log(data)
  // console.log(cartData)
  if (cartData) {
    const existedIndex = cartData.findIndex((item) => item.id === data.id)
    if (existedIndex !== -1) {
      for (let index = 0; index < cartData[existedIndex].itemsmenu.length; index++) {
        if (JSON.stringify(cartData[existedIndex].itemsmenu[index].name) === JSON.stringify(data.itemsmenu[0].name) && JSON.stringify(cartData[existedIndex].itemsmenu[index].variants) === JSON.stringify(data.itemsmenu[0].variants) && cartData[existedIndex].itemsmenu[index].extras.join() === data.itemsmenu[0].extras.join()) {
          cartData[existedIndex].itemsmenu[index].count += data.itemsmenu[0].count
          cartData[existedIndex].itemsmenu[index].individualSum += data.itemsmenu[0].individualSum
          cartData[existedIndex].totalCount += data.itemsmenu[0].count
          cartData[existedIndex].totalSum += data.itemsmenu[0].individualSum
          return {
            type: ADD_TO_CART,
            payload: cartData
          }
        }
      }

      cartData[existedIndex].itemsmenu.push(data.itemsmenu[0])

      const countArray = cartData[existedIndex].itemsmenu.map(element => element.count)
      cartData[existedIndex].totalCount = countArray.reduce((acc, curr) => acc + curr, 0)

      const priceArray = cartData[existedIndex].itemsmenu.map(element => element.individualSum)
      cartData[existedIndex].totalSum = priceArray.reduce((acc, curr) => acc + curr, 0)
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
