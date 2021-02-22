import React, {ChangeEvent} from 'react';
import {Slider, Typography} from "@material-ui/core";

type propsType = {
    // min: number
    // max: number
    valuetext: any
    setValue: (value: number | number[]) => void
}

const Range = (props: propsType) => {
    // const [value, setValues] = React.useState <number[]>([props.min,props.max]);
    // let value = [props.min, props.max]
 let value = [1000,8000]
    const handleChange = (event: any, newValue: number | number[]): void => {
        props.setValue(newValue as number[])
    };

    return (
        <>
            <Typography id="discrete-slider-custom" gutterBottom>
                Material-UI min - max
            </Typography>
            <Slider
                value={value}
                // step={100}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={props.valuetext}
            />

        </>
    );
};

export default Range;
