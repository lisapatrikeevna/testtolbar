import {applyMiddleware, combineReducers, createStore} from "redux"
import {ProductReducer} from "./productReducer";
import thunkMiddleware from "redux-thunk";

export type RootStateType = ReturnType<typeof reducers>

let reducers = combineReducers({
    products: ProductReducer,
})

let store = createStore(reducers,applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store
export default store
