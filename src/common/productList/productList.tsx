import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from '../../redux/store'
import {productsType, setProductAC} from "../../redux/productReducer"
import cl from './ProductList.module.css'
import data from '../../redux/products.json'
import ItemProduct from './itemProduct'
import {sortArrProd} from "../../expansive/filtered";


const ProductList = () => {

    let filterMin =useSelector<RootStateType,number>(state => state.products.filterMin)
    let filterMax =useSelector<RootStateType,number>(state => state.products.filterMax)
    let currency =useSelector<RootStateType,string>(state => state.products.currency)

    const dispatch = useDispatch()
    let products = useSelector<RootStateType, Array<productsType>>(state => state.products.products)
    let ollProducts = products
    console.log(ollProducts)
    const abcType = useSelector<RootStateType, string>(state => state.products.sort)

    useEffect(() => {
        const data1: any  = data
        if(products.length <data1.products.length){
            dispatch(setProductAC(data1.products))
        }else {
            dispatch(setProductAC(products))
        }
    }, [dispatch,ollProducts])

    ollProducts = ollProducts.filter(p=> Number(p.price) >= Number(filterMin) && Number(p.price) <= Number(filterMax))

    const product = sortArrProd(ollProducts, abcType).map(p => <ItemProduct key={p.id} id={p.id} image={p.image} name={p.name} description={p.description} price={p.price} currency={currency}/>)

    return (
        <div className={cl.ollWrap}>
            {product}
        </div>
    );
};

export default ProductList;