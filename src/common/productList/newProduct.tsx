import {IconButton} from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import {green} from '@material-ui/core/colors'
import InputBase from '@material-ui/core/InputBase/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import React, {ChangeEvent, useState} from 'react'
import {useDispatch} from "react-redux"
import {setNewProductAC} from "../../redux/productReducer"
import cl from './newProduct.module.css'
import {PhotoCamera} from "@material-ui/icons";
import {validate} from '../../expansive/validate'
import {Input} from "../../expansive/Input";

const NewProduct = () => {
    const dispatch = useDispatch()
    let [name, setName] = useState<string>('')
    let [price, setPrice] = useState('')
    let [description, setDescription] = useState('')
    const onChangeName = (value:string) => {
        setName(value)
    }
    const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        let value = e.currentTarget.value;
        // if (!isFinite(value)) return;
        setPrice(value)
    }
    const onDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }
    let [image, setImage] = useState('')
    let [success, setSuccess] = useState('Upload image')
    const onSetImage = (e: any) => {
        let image = URL.createObjectURL(e.target.files[0])
       // onValidate()
        setImage(image)
        setSuccess('Success')
    }
    const setNewProduct = () => {
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
    let [error, setError] = useState<string>('')


    return (
        <form className={cl.itemWrap}>
            <div className={cl.content}>
                <Input  label="name" value={name} addInputValue={onChangeName} placeholder={'name'}
                            title={'enter value'} helperText={error} validate={validate}/>
                <TextField className={classes.margin} label="price UAN" required value={price} onChange={onChangePrice}
                           variant="outlined" title={'enter value'} error={!!error}
                           helperText={error}/>
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
                <TextField id="outlined-uncontrolled" label="description" multiline rows={4}
                           placeholder={'description'}
                           variant="outlined" onChange={onDescription} value={description} title={'enter desc'}
                           helperText={error} required/>
                <Button variant="contained" onClick={setNewProduct} color="primary">save</Button>
            </div>
        </form>
    )
}
export default NewProduct;

