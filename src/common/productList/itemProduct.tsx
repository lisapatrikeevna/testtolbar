import React, {ChangeEvent, useState} from 'react'
import {useDispatch} from "react-redux"
import {productsType, setNewProductAC} from "../../redux/productReducer"
import cl from './ItemProduct.module.css'
import img1 from '../../img/products/2.jpg'
type propsType={
    currency:string
}

const ItemProduct = (props:productsType & propsType) => {
    const dispatch = useDispatch()
    // let [name, setName] = useState('')
    // const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.currentTarget.value)
    // }
    // const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    //     let value = e.currentTarget.valueAsNumber;
    //     if (!isFinite(value)) return;
    //     setPrice(value)
    // }
    // let [description, setDescription] = useState('')
    // const onDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setDescription(e.currentTarget.value)
    // }
    // let [image, setImage] = useState('')

    return (
        <div className={cl.itemWrap} key={props.id}>
            <img src={`/testtolbar/static/media/${props.image}`} alt={props.name}/>
            <img src={`../../img/products/${props.image}`} alt={props.name}/>
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