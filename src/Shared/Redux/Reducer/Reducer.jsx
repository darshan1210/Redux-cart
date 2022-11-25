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
  }],
  totalPrize: 0,
  totalCount: 0
}
export default function cartItems (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        mainData: [...state.mainData, {
          id: action.Id,
          name: action.foodType,
          items: [{
            count: action.Count,
            print: action.printType,
            extraitems: action.extraItems,
            itemData: action.Payload
          }]
        }]
      }
    default:
      return state
  }
}
