import { ADD_TO_CART } from '../Action/Action_type'

const initialState = {
  CartData: []
}

export default function cartItems (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        CartData: action.data
      }
    default:
      return state
  }
}
