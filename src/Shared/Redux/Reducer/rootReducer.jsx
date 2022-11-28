import { combineReducers } from 'redux'
import cartItems from './Reducer'
import TotalBill from './total-bill'
export default combineReducers({ cartItems, TotalBill })
