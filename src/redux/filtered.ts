import {productsType} from "./productReducer";

export  const sortArrProd=(products:Array<productsType>,sortType:string): Array<productsType>=>{
    if (sortType==='ABC') {
        return products.sort((a, b) => {
            if (a.name > b.name) {return 1}
            if (a.name < b.name) {return -1}
            return 0
        })
    }
    if (sortType==='min'){
        return  products.sort((a, b) => {
            if (a.price > b.price) {
                return 1
            }
            if (a.price < b.price) {
                return -1
            }
            return 0
        })
    }
    if (sortType==='max'){
        return products.sort((a, b) => {
            if (a.price < b.price) {
                return 1
            }
            if (a.price > b.price) {
                return -1
            }
            return 0
        })
    }

    return products

}