import React from 'react'
import {productsType} from "../../redux/productReducer"
import cl from './ItemProduct.module.css'
type propsType={
    currency:string
}

const ItemProduct = (props:productsType & propsType) => {

    return (
        <div className={cl.itemWrap} key={props.id}>
            <img src={props.image} alt={props.name}/>
            <div className={cl.content}>
                <h3>{props.name}</h3>
                <div className={cl.prise}>{props.price}<span> {props.currency}</span></div>
                <div className={cl.desc}>{props.description}</div>
            </div>
        </div>
    );
};

export default ItemProduct;