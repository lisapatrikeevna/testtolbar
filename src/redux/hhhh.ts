import {productsType} from "./productReducer";

export  const sortArrProd=(products:Array<productsType>,sortType:string)=>{
    if (sortType==='ABC') {
      let ddd:Array<productsType>=  products.sort((a, b) => {
            if (a.name > b.name) {return 1}
            if (a.name < b.name) {return -1}
            return 0
        })
        return ddd
    }
}