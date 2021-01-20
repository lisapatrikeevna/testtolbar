import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from '../../redux/store';
import {productsType, setProductAC} from "../../redux/productReducer";
import cl from './ProductList.module.css'
import data from '../../redux/products.json'
import img1 from '../../products/1.jpg'



const ProductList = () => {
    useEffect(() => {
        const data1: any  = data
        dispatch(setProductAC(data1.products))
    }, [])
    let filterMin =useSelector<RootStateType,number>(state => state.products.filterMin)
    let filterMax =useSelector<RootStateType,number>(state => state.products.filterMax)
    const dispatch = useDispatch()
    let products = useSelector<RootStateType, Array<productsType>>(state => state.products.products)
    let ollProducts = products
    const abcType = useSelector<RootStateType, string>(state => state.products.sort)
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
    const ItemProduct = ollProducts.map(p => {
        return  (<div className={cl.itemWrap} key={p.id}>
                <img src={p.image} alt={p.name}/>
                <div className={cl.content}>
                    <h3>{p.name}</h3>
                    <div className={cl.prise}>{p.price}<span> UAN</span></div>
                    <div className={cl.desc}>{p.description}</div>
                </div>
            </div>)
        }
    )
    return (
        <div className={cl.ollWrap}>
            {ItemProduct}
        </div>
    );
};

export default ProductList;