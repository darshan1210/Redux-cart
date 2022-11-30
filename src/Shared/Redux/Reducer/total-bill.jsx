import { CLEAR_BILL, TOTAL_BILL } from '../Action/Action_type'

function TotalBill (state = 0, action) {
  switch (action.type) {
    case TOTAL_BILL:
      return {
        data: action.payload
      }
    case CLEAR_BILL:
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export default TotalBill
