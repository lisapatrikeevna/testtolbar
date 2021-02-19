import Button from '@material-ui/core/Button/Button';
import React from 'react';
import {useDispatch} from "react-redux";
import {setCurrencyAC} from '../../../redux/productReducer';

type propsTYpe={
    currency:string
}
const Currency = (props:propsTYpe) => {
    const dispatch = useDispatch()
    const ChangeCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
        debugger
        if(e.currentTarget.textContent) {
            dispatch(setCurrencyAC(e.currentTarget.textContent ))
        }
    }
    //
// const setUAN=()=>{}
    return (
        <div>
            {props.currency==='USD' ?
                <Button variant="outlined" onClick={ChangeCurrency}>UAN</Button>
             :   <Button variant="outlined" onClick={ChangeCurrency}>USD</Button>}
        </div>
    )
};

export default Currency;