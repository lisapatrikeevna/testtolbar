import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from '../../redux/store'
import {productsType, setProductAC} from "../../redux/productReducer"
import cl from './ProductList.module.css'
import data from '../../redux/products.json'
import ItemProduct from './itemProduct'



const ProductList = () => {

    // useEffect(() => {
    //     const data1: any  = data
    //     debugger
    //
    // }, [])
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
            debugger
            dispatch(setProductAC(products))
        }
    }, [dispatch,ollProducts])





    if (abcType === 'ABC') {
        ollProducts = [...ollProducts].sort((a, b) => {
            if (a.name > b.name) {
                return 1
            }
            if (a.name < b.name) {
                return -1
            }
            return 0
        })
        console.log(ollProducts)
    }
    if (abcType === 'max') {
        ollProducts = [...ollProducts].sort((a, b) => {
            if (a.price < b.price) {
                return 1
            }
            if (a.price > b.price) {
                return -1
            }
            return 0
        })
        console.log(ollProducts)
    }
    if (abcType === 'min') {
        ollProducts = ollProducts.sort((a, b) => {
            if (a.price > b.price) {
                return 1
            }
            if (a.price < b.price) {
                return -1
            }
            return 0
        })
    }
    if(filterMin){
        ollProducts = ollProducts.filter(p=> Number(p.price) >= Number(filterMin))
    }
    if(filterMax){
        ollProducts = ollProducts.filter(p=> Number(p.price) >= Number(filterMax))
    }
//    const product = ollProducts.map(p => <ItemProduct key={p.id} id={p.id} image={p.image} name={p.name} description={p.description} price={p.price} currency={currency}/>)
    const product = products.map(p => <ItemProduct key={p.id} id={p.id} image={p.image} name={p.name} description={p.description} price={p.price} currency={currency}/>)
    console.log(product)
    return (
        <div className={cl.ollWrap}>
            {product}
        </div>
    );
};

export default ProductList;