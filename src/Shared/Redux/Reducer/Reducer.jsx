import { ADD_TO_CART, CLEAR_CART } from '../Action/Action_type'

export default function cartItems (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        data: action.payload
      }
    case CLEAR_CART:
      return {
        data: action.payload
      }
    default:
      return state
  }
}
