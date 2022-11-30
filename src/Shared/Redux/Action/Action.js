/* eslint-disable no-unused-vars */
import { ADD_TO_CART, CLEAR_BILL, CLEAR_CART, TOTAL_BILL } from './Action_type'

export const AddToCart = data => {
  return {
    type: ADD_TO_CART,
    payload: data
  }
}

let appendBill = 0
export const totalBill = (data) => {
  appendBill += data
  return {
    type: TOTAL_BILL,
    payload: appendBill
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: []
  }
}
export const clearTotal = () => {
  return {
    type: CLEAR_BILL,
    payload: 0
  }
}
