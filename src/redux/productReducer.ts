export type productsType = {
    id: number
    name: string
    price: number
    image: string
    description: string
}
type productInitialStateType = {
    products: Array<productsType>
    sort: string
    filterMin:number
    filterMax:number
}
let initialState: productInitialStateType = {
    products: [],
    sort: 'ABC',
    filterMin:0,
    filterMax:11000,
}
type setProductACACType = ReturnType<typeof setProductAC>
type setNewProductACType = ReturnType<typeof setNewProductAC>
type sortTypeACType = ReturnType<typeof sortTypeAC>
type setMinTypeACType = ReturnType<typeof setMinTypeAC>
type setMaxTypeACType = ReturnType<typeof setMaxTypeAC>
type ActionType = setProductACACType | setNewProductACType | sortTypeACType |setMinTypeACType | setMaxTypeACType
export const ProductReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
        ...state, products: action.products
        }
        case 'SET_NEW_PRODUCT': return {
            ...state, products:[...state.products, action.newProduct]
        }
        case 'SORT_TYPE_PRODUCT': return {
            ...state, sort: action.sortType
        }
        case 'SORT_TYPE_MIN': return {
            ...state, filterMin:action.num
        }
        case 'SORT_TYPE_MAX': return {
            ...state, filterMax: action.num
        }
        default  :
            return state;
    }
}
export const setProductAC = (products: Array<productsType>) => ({type: 'SET_PRODUCT', products} as const)
export const setNewProductAC = (newProduct: productsType) => ({type: 'SET_NEW_PRODUCT', newProduct} as const)
export const sortTypeAC = (sortType: string) => ({type: 'SORT_TYPE_PRODUCT', sortType} as const)
export const setMinTypeAC = (num:number) => ({type: 'SORT_TYPE_MIN', num} as const)
export const setMaxTypeAC = (num:number) => ({type: 'SORT_TYPE_MAX', num} as const)
