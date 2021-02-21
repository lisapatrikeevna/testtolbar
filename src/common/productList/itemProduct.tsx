import React from 'react'
import {productsType} from "../../redux/productReducer"
import cl from './ItemProduct.module.css'
import img1 from '../../img/products/2.jpg'
type propsType={
    currency:string
}

const ItemProduct = (props:productsType & propsType) => {

const Img: any = ()  => {return require(`./../../img/products/${props.image}`) }
    return (
        <div className={cl.itemWrap} key={props.id}>
            {/*<img src={`/testtolbar/static/media/${props.image}`} alt={props.name}/>*/}
            {/*<img src={require(props.image)} alt={props.name}/>*/}
            <img src={img1} alt={props.name}/>
            <div className={cl.content}>
                <h3>{props.name}</h3>
                <div className={cl.prise}>{props.price}<span> {props.currency}</span></div>
                <div className={cl.desc}>{props.description}</div>
            </div>
        </div>
    );
};

export default ItemProduct;