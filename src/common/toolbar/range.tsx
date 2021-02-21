import React, {ChangeEvent} from 'react';
import {Slider, Typography, withStyles} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setMaxTypeAC, setMinTypeAC} from "../../redux/productReducer";

type propsType={
    min:any
    max:any
    valuetext:any
    // setValue:( value: number | number[])=>void
    // value:number[]
    // onChangeMin:( value: any )=>void
    // onChangeMax:( value: any )=>void
}

const Range = (props:propsType) => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState <number[]>([props.min,props.max]);
   //const handleChange = (e: React.ChangeEvent<{}>, newValue: number | number[]):void => {
    const handleChange = (event: any, newValue: number | number[]):void => {
       debugger
        setValue(newValue as number[])
    };
if (value[0] !==props.min){
    dispatch(setMinTypeAC(value[0]))
}
if (value[1] !==props.max){
    dispatch(setMaxTypeAC(value[1]))
}
    const AirbnbSlider = withStyles({
        root: {
            color: '#3a8589',
            height: 3,
            padding: '13px 0',
        },
        thumb: {
            height: 27,
            width: 27,
            backgroundColor: '#fff',
            border: '1px solid currentColor',
            marginTop: -12,
            marginLeft: -13,
            boxShadow: '#ebebeb 0 2px 2px',
            '&:focus, &:hover, &$active': {
                boxShadow: '#ccc 0 2px 3px 1px',
            },
            '& .bar': {
                // display: inline-block !important;
                height: 9,
                width: 1,
                backgroundColor: 'currentColor',
                marginLeft: 1,
                marginRight: 1,
            },
        },
        active: {},
        track: {
            height: 3,
        },
        rail: {
            color: '#d8d8d8',
            opacity: 1,
            height: 3,
        },
    })(Slider);
    function AirbnbThumbComponent(props: any) {
        return (
            <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
        );
    }
const bbb= (index:number)=>{
    // index === 0 ? setValue(e:any): 'Maximum price'
}
    return (
        <>
            <Typography id="discrete-slider-custom" gutterBottom>
                Material-UI min - max
            </Typography>
            {/*<Slider*/}
            {/*    // value={props.value}*/}
            {/*    value={value}*/}
            {/*    step={500}*/}
            {/*    onChange={handleChange}*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*    aria-labelledby="range-slider"*/}
            {/*    getAriaValueText={props.valuetext}*/}
            {/*/>*/}
            <AirbnbSlider
                ThumbComponent={AirbnbThumbComponent}
                // getAriaLabel={bbb}
                defaultValue={value}
            />
        </>
    );
};

export default Range;
