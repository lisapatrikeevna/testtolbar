import {IconButton} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {setNewProductAC} from "../../redux/productReducer"
import cl from './newProduct.module.css'
import {PhotoCamera} from "@material-ui/icons";
import {validate} from '../../expansive/validate'
import {Input} from "../../expansive/Input";

const NewProduct = () => {
    const dispatch = useDispatch()
    let [error, setError] = useState<string>('')
    let [name, setName] = useState<string>('')
    let [price, setPrice] = useState('')
    let [description, setDescription] = useState('')
    let [disable, setDisable] = useState(true)
    let [image, setImage] = useState('')
    let [success, setSuccess] = useState('Upload image')
    const onChangePrice = (price: string) => {
        // if (!isFinite(value)) return;
        setPrice(price)
    }
    const onDescription = (description: string) => {
        setDescription(description)

    }
    const onSetImage = (e: any) => {
        let image = URL.createObjectURL(e.target.files[0])
        setImage(image)
        setSuccess('Success')
    }
    const onChangeName = (name: string) => {
        setName(name)
    }

    useEffect(() => {

        if (!name || !image || !description || !price) {
            setError('all fields Required')
            setDisable(true)
        } else {
            setDisable(false)
        }
    },[name, image, description, price])

    const setNewProduct = () => {

        let id = new Date().getTime()
        let payload = {id, name, price: Number(price), image, description}
        dispatch(setNewProductAC(payload))
        setName('')
        setPrice('')
        setDescription('')
        setImage('')
        setSuccess('Upload image')
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }));
    const classes = useStyles();

    return (
        <form className={cl.itemWrap}>
            <div className={cl.content}>
                <Input className={classes.margin} label="name" value={name} addInputValue={onChangeName}
                       placeholder={'name'} title={'enter value'} helperText={error} validate={validate}/>
                <Input className={classes.margin} label="price" value={price} addInputValue={onChangePrice}
                       placeholder={price} title={'enter value'} helperText={error} validate={validate}/>
                <div className={classes.root}>
                    <input accept="image/*" id="icon-button-file" type="file" className={classes.input}
                           onChange={onSetImage}/>
                    <label htmlFor="icon-button-file">
                        {success}
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                </div>
                <Input id="outlined-textarea" label="description" multiline rows={8}
                       placeholder={'description'} validate={validate}
                       variant="outlined" addInputValue={onDescription} value={description} title={'enter desc'}
                       helperText={error} required/>
                <Button variant="contained" onClick={setNewProduct} color="primary"
                        disabled={disable}
                >save</Button>
            </div>
        </form>
    )
}
export default NewProduct;

