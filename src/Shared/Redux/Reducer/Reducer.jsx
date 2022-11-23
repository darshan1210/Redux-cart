/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import { ADD_TO_CART } from '../Action/Action_type'

const initialState = {
  CartData: [],
  maintitle: [],
  itemcount: 1,
  checkPrint: ''
}
export default function cartItems (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const checkitem = state.CartData.filter((element) => element.id === action.payload.id)
      if (checkitem.length === 0) {
        return {
          ...state,
          CartData: [...state.CartData, action.payload],
          checkPrint: action.printData
        }
      } else {
        return {
          ...state,
          itemcount: state.itemcount + 1
        }
      }

      // return {
      //   ...state,
      //   CartData: action.data,
      //   totalQnty: state.totalQnty + action.count,
      //   totalPrize: state.totalPrize + action.totalprize * action.count
      // }
    default:
      return state
  }
}
