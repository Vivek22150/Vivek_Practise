import amountReducer from "./amountReducer";

import { combineReducers } from "redux";

const reducer =combineReducers({
    amount:amountReducer
})



export default reducer ;