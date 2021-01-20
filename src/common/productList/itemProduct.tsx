import React, {ChangeEvent, useState} from 'react'
import {useDispatch} from "react-redux"
import {setNewProductAC} from "../../redux/productReducer"
import cl from './ItemProduct.module.css'

const ItemProduct = () => {
    const dispatch = useDispatch()
    let [name, setName] = useState('')
    let [price, setPrice] = useState(0)
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.valueAsNumber;
        if (!isFinite(value)) return;
        setPrice(value)
    }
    let [description, setDescription] = useState('')
    const onDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }
    let [image, setImage] = useState('')
    const onSetImage = (e: any) => {
        debugger
        let image = URL.createObjectURL(e.target.files[0])
        setImage(image)
    }
    const setNewProduct = () => {
        let id = new Date().getTime()
        let payload = {id, name, price, image, description}
        dispatch(setNewProductAC(payload))
    }
    return (
        <div className={cl.itemWrap}>
            <div className={cl.content}>
                <input type='text' placeholder={'name'} value={name} maxLength={20} minLength={1}
                       onChange={onChangeName}/>
                <input type='number' placeholder={'price'} value={price} onChange={onChangePrice}/>
                <input type='file' placeholder={'img'} onChange={onSetImage}/>
            </div>
            <div className={cl.content}>
                <textarea placeholder={'description'} value={description} minLength={1} onChange={onDescription}/>
                <button onClick={setNewProduct}>save</button>
            </div>
        </div>
    );
};

export default ItemProduct;