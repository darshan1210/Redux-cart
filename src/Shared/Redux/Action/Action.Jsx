import { ADD_TO_CART } from './Action_type'

export const AddToCart = (Id, foodType, Count, printType, extraItems, itemData) => {
  return {
    type: ADD_TO_CART,
    Id,
    foodType,
    Count,
    printType,
    extraItems,
    Payload: itemData
  }
}
