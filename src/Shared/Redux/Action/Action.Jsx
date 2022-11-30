/* eslint-disable no-unused-vars */
import { ADD_TO_CART } from './Action_type'

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
    type: 'TOTAL_BILL',
    payload: appendBill
  }
}
