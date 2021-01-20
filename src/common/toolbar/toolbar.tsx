import React, {ChangeEvent, useState} from 'react';
import {setMaxTypeAC, setMinTypeAC} from '../../redux/productReducer';
import {Sort} from "./sort/Sort";
import cl from './Toolbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

const Toolbar = () => {
    const dispatch = useDispatch()
    let min =useSelector<RootStateType,number>(state => state.products.filterMin)
    let max =useSelector<RootStateType,number>(state => state.products.filterMax)
    const onChangeMin=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setMinTypeAC(e.currentTarget.valueAsNumber))
    }

    const onChangeMax=(e:ChangeEvent<HTMLInputElement>)=>{
        let value = e.currentTarget.valueAsNumber;
        if (!isFinite(value)) return;
        dispatch(setMaxTypeAC(value))
    }
    return (
        <div className={cl.nav}>
            <div className="price">
                <label > min <input type={'number'} value={min} onChange={onChangeMin}/></label><br/>
                <label > max <input type={'number'} value={max} min={min} onChange={onChangeMax}/></label>
            </div>
            <div className={cl.sort}><Sort items={[{title: "ABC", value: "ABC"}, {title: "max", value: "max"}, {title: "min", value: "min"}]}/></div>
        </div>
    );
};

export default Toolbar;