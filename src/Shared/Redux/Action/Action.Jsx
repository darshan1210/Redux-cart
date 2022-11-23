import { ADD_TO_CART } from './Action_type'

export const AddToCart = (data, count, printData) => {
  console.log(printData)
  return {
    type: ADD_TO_CART,
    payload: data,
    count,
    printData

  }
}
