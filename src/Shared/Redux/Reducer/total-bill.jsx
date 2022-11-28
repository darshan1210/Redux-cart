function TotalBill (state = 0, action) {
  switch (action.type) {
    case 'TOTAL_BILL':
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export default TotalBill
