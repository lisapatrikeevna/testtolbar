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

const NewProduct = () => {
    const dispatch = useDispatch()
    let [name, setName] = useState<string>('')
    let [price, setPrice] = useState('')
    let [description, setDescription] = useState('')
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
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
        onValidate()
        let id = new Date().getTime()
        let piceAsNUMBER = Number(price)
        let payload = {id, name, price: piceAsNUMBER, image, description}
        dispatch(setNewProductAC(payload))
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
    const onValidate = () => {
        if (name !== null) {
            debugger
            const err = validate(name, 2, 12, 'name')
            setError(err)
        }
        if (price) {
            debugger
            const err = validate(price, 1, 4, 'price')
            setError(err)
        }
        if (description) {
            debugger
            const err = validate(description, 3, 33, 'description')
            setError(err)
        }
        if (image) {
            debugger
            const err = validate(image, 1, 14444, 'image')
            setError(err)
        }
    }
    const handleBlur = () => {
       // onValidate()
    }
    return (
        <form className={cl.itemWrap}>
            <div className={cl.content}>
                <TextField className={classes.margin} label="name" value={name} onChange={onChangeName}
                           variant="outlined" title={'enter value'} helperText={error} error={!!error}/>
                <TextField className={classes.margin} label="price UAN" required value={price} onChange={onChangePrice}
                           variant="outlined" onBlur={handleBlur} title={'enter value'} error={!!error}
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
                <TextField id="outlined-uncontrolled" onBlur={handleBlur} label="description" multiline rows={4}
                           placeholder={'description'}
                           variant="outlined" onChange={onDescription} value={description} title={'enter desc'}
                           helperText={error} required/>
                <Button variant="contained" onClick={setNewProduct} color="primary">save</Button>
            </div>
        </form>
    )
}
export default NewProduct;

// const CssTextField = withStyles({
//     root: {
//         '& label.Mui-focused': {
//             color: 'green',
//         },
//         '& .MuiInput-underline:after': {
//             borderBottomColor: 'green',
//         },
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderColor: 'red',
//             },
//             '&:hover fieldset': {
//                 borderColor: 'yellow',
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: 'green',
//             },
//         },
//     },
// })(TextField);
// const BootstrapInput = withStyles((theme) => ({
//     root: {
//         'label + &': {
//             marginTop: theme.spacing(3),
//         },
//     },
//     input: {
//         borderRadius: 4,
//         position: 'relative',
//         backgroundColor: theme.palette.common.white,
//         border: '1px solid #ced4da',
//         fontSize: 16,
//         width: 'auto',
//         padding: '10px 12px',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         // Use the system font instead of the default Roboto font.
//         fontFamily: [
//             '-apple-system',
//             'BlinkMacSystemFont',
//             '"Segoe UI"',
//             'Roboto',
//             '"Helvetica Neue"',
//             'Arial',
//             'sans-serif',
//             '"Apple Color Emoji"',
//             '"Segoe UI Emoji"',
//             '"Segoe UI Symbol"',
//         ].join(','),
//         '&:focus': {
//             boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//             borderColor: theme.palette.primary.main,
//         },
//     },
// }))(InputBase);
// const useStylesReddit = makeStyles((theme) => ({
//     root: {
//         border: '1px solid #e2e2e1',
//         overflow: 'hidden',
//         borderRadius: 4,
//         backgroundColor: '#fcfcfb',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         '&:hover': {
//             backgroundColor: '#fff',
//         },
//         '&$focused': {
//             backgroundColor: '#fff',
//             boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//             borderColor: theme.palette.primary.main,
//         },
//     },
//     focused: {},
// }));

// function RedditTextField(props: any) {
//     const classes = useStylesReddit();
//     return <TextField InputProps={{classes, disableUnderline: true}} {...props} />;
// }
// const ValidationTextField = withStyles({
//     root: {
//         '& input:valid + fieldset': {
//             borderColor: 'green',
//             borderWidth: 2,
//         },
//         '& input:invalid + fieldset': {
//             borderColor: 'red',
//             borderWidth: 2,
//         },
//         '& input:valid:focus + fieldset': {
//             borderLeftWidth: 6,
//             padding: '4px !important', // override inline-style
//         },
//     },
// })(TextField);
// const theme = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });