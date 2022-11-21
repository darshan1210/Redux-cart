import { ADD_TO_CART } from './Action_type'

export const addToCart = (data) => {
  console.log(data)
  return {
    type: ADD_TO_CART,
    data
  }
}
