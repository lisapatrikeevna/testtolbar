import React, {ChangeEvent, useState} from 'react';
import {setMaxTypeAC, setMinTypeAC} from '../../redux/productReducer';
import {Sort} from "./sort/Sort";
import cl from './Toolbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Currency from "./currency/currency"
import Range from './range'
import {DoubleRangeSlider} from "./Wrange";

const Toolbar = () => {
    const dispatch = useDispatch()
    let min = useSelector<RootStateType, number>(state => state.products.filterMin)
    let max = useSelector<RootStateType, number>(state => state.products.filterMax)

     const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        dispatch(setMinTypeAC(e.currentTarget.valueAsNumber))
    }
    let currency = useSelector<RootStateType, string>(state => state.products.currency)
    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.valueAsNumber;
        if (!isFinite(value)) return;
        dispatch(setMaxTypeAC(value ))
    }
    // const onChaneRangeHandler=(values:number[])=> {
        const setMinValue = (value:number) => {
            dispatch(setMinTypeAC(value))
        }
        const setMaxValue = (value:number) => {
            dispatch(setMaxTypeAC(value))
        }
    // }

    return (
        <div className={cl.nav}>
            <div className={cl.currency}>
                <Currency currency={currency}/>
            </div>
            <div className="price">
                <label> min <input type={'number'} value={min} onChange={onChangeMin}/></label><br/>
                <label> max <input type={'number'} value={max} min={min} onChange={onChangeMax}/></label>

            </div>
            {/*<Range valuetext={valuetext} min={min}  max={max}*/}
            {/*       // onChangeMax={setMinValue} onChangeMin={setMaxValue}*/}
            {/*/>*/}

            <DoubleRangeSlider min={min} max={max}
                // @ts-ignore
                               setValue1={setMinValue} setValue2={setMaxValue}
            />
            <div className={cl.sort}><Sort items={[{title: "ABC", value: "ABC"}, {title: "max", value: "max"}, {title: "min", value: "min"}]}/>
            </div>

        </div>
    );
};

export default Toolbar;