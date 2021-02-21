import {IconButton} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import {green} from '@material-ui/core/colors'
import InputBase from '@material-ui/core/InputBase/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import React, {ChangeEvent, useEffect, useState} from 'react'
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


    const setNewProduct = () => {
        debugger
        if (name && image && description && Number(price)) {
            debugger
            setError('all fields Required')
            setDisable(false)
        } else {
            setDisable(true)
        }
        let id = new Date().getTime()
        let piceAsNUMBER = Number(price)
        let payload = {id, name, price: piceAsNUMBER, image, description}
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
                {/*<TextField  helperText={error} placeholder={'name'} className={classes.margin} label="name"*/}
                {/*        error={!!error} variant="outlined"*/}
                {/*/>*/}
                <Input className={classes.margin} label="name" value={name} addInputValue={onChangeName}
                       placeholder={'name'} title={'enter value'} helperText={error} validate={validate}/>
                <Input className={classes.margin} label="price UAN" value={price} addInputValue={onChangePrice}
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
            </div>
            <div className={cl.content}>
                <Input id="outlined-uncontrolled" label="description" multiline rows={4}
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

