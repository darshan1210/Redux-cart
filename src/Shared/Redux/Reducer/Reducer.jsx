import { ADD_TO_CART } from '../Action/Action_type'

const initialState = {
  mainData: [{
    id: '',
    name: '',
    items: [{
      count: 0,
      print: {},
      extraitems: [],
      itemData: {}
    }]
  }]
}
export default function cartItems (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        mainData: [...state.mainData, {
          id: action.Id,
          name: action.foodType,
          items: [...state.mainData.items, {
            count: action.Count,
            print: action.printType,
            extraitems: action.extraItems,
            itemData: action.payload
          }]
        }]
      }
    default:
      return state
  }
}
