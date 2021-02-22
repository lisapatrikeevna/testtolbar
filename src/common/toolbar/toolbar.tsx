import React, {ChangeEvent, useState} from 'react';
import {setMaxTypeAC, setMinTypeAC} from '../../redux/productReducer';
import {Sort} from "./sort/Sort";
import cl from './Toolbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import Currency from "./currency/currency"
import Range from './range'
import {DoubleRangeSlider} from "./wrange/Wrange";
import {ExampleModal} from "../../expansive/modalForm/exampleModal";
import NewProduct from "../productList/newProduct";
import { Button } from '@material-ui/core';

const Toolbar = () => {
    const dispatch = useDispatch()
    let min = useSelector<RootStateType, number>(state => state.products.filterMin)
    let max = useSelector<RootStateType, number>(state => state.products.filterMax)
    let currency = useSelector<RootStateType, string>(state => state.products.currency)

    const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinTypeAC(e.currentTarget.valueAsNumber))
    }
    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.valueAsNumber;
        if (!isFinite(value)) return;
        dispatch(setMaxTypeAC(value))
    }
    const setMinValue = (value: number) => {
        dispatch(setMinTypeAC(value))
    }
    const setMaxValue = (value: number) => {
        dispatch(setMaxTypeAC(value))
    }
    const setValue = (values: number[]) => {
        let setMinV = values[0] * 100
        dispatch(setMinTypeAC(setMinV))

        let setMaxV = values[1] * 100
        dispatch(setMaxTypeAC(setMaxV))
    }

    function valuetext(value: number,currency:string) {
        return `${value} ${currency}`;
    }
    let [popupId, setPopupId] = useState('')
    let [collapse, setCollapse] = useState(false)
    const OnClickPr = () => {
        setCollapse(!collapse)
        setPopupId("1")
    }
    const cancel = () => {
        setCollapse(!collapse)
    }
    return (
        <div className={cl.nav}>

            <Button variant="contained" color="primary" onClick={OnClickPr}>
                add new product
            </Button>
            <div className={cl.currency}>
                <Currency currency={currency}/>
            </div>
            <div className="price">
                <label> min <input type={'number'} value={min} onChange={onChangeMin}/></label><br/>
                <label> max <input type={'number'} value={max} min={min} onChange={onChangeMax}/></label>
            </div>
            {/*<Range valuetext={valuetext}*/}
            {/*    // @ts-ignore*/}
            {/*       setValue={setValue}*/}
            {/*/>*/}

            {/*<DoubleRangeSlider min={min} max={max}*/}
            {/*    // @ts-ignore*/}
            {/*                   setValue1={setMinValue} setValue2={setMaxValue}*/}
            {/*/>*/}
            <div className={cl.sort}><Sort
                items={[{title: "ABC", value: "ABC"}, {title: "max", value: "max"}, {title: "min", value: "min"}]}/>
            </div>
            <ExampleModal collapse={collapse && popupId === '1'} closed={cancel}
                          children={<NewProduct/>} modalHeader={'ps. all fields is required'}/>
        </div>
    );
};

export default Toolbar;