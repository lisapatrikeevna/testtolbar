import React, {ChangeEvent} from "react";
import './wrange.scss';


type stateType={
    sliderWidth: number
    offsetSliderWidht: number
    min: number
    max: number
    minValueBetween: number
    currentMin: number
    inputMin: number
    currentMax: number
    inputMax: number
}
type propsType={
    min:number
    max:number
    setValue1:(v1:number)=>void
    setValue2:(v2:number)=>void
}
export class DoubleRangeSlider extends React.Component<propsType> {
    slider: any
    minValue: any
    maxValue: any
    onMouseUp: any
    maxValueDrag: any
    minValueDrag: any
    state:stateType = {
        sliderWidth: 0,
        offsetSliderWidht: 0,
        // min: 0,
        min:this.props.min,
        // max: 200,
        max: this.props.max,
        minValueBetween: 10,
        currentMin: 55,
        inputMin: 55,
        currentMax: 100,
        inputMax: 100
    };
    componentDidMount() {
        const { currentMin, currentMax, max } = this.state;
        this.minValue.style.width = (currentMin*100)/max + "%";
        this.maxValue.style.width = (currentMax*100)/max + "%";

        this.setState({
            sliderWidth: this.slider.offsetWidth,
            offsetSliderWidht: this.slider.offsetLeft,
        })
    }

    setMin = (e:any) => {
        const { min, max, currentMax, minValueBetween } = this.state;
        const inputMin = e.target.value;

        this.setState({
            inputMin
        });

        if((+inputMin >= min) && (+inputMin <= (currentMax-minValueBetween))){
            this.setState({
                currentMin: parseInt(inputMin)
            });

            this.minValue.style.width = (+inputMin*100)/max + "%";
        }
    }

    changeMinValue = (e:any) => {
        e.preventDefault();

        document.addEventListener('mousemove', this.onMouseMoveMin);
        document.addEventListener('mouseup', this.onMouseUpMin);

        document.addEventListener('touchmove', this.onMouseMoveMin);
        document.addEventListener('touchend', this.onMouseUpMin);
    }

    onMouseMoveMin = (e:any) => {
        const { min, max, currentMax, minValueBetween, sliderWidth, offsetSliderWidht } = this.state;

        const dragedWidht = e.clientX - offsetSliderWidht;
        const dragedWidhtInPercent:number = (dragedWidht*100)/sliderWidth;
        console.log(typeof dragedWidhtInPercent);
        const currentMin = Math.abs((max * dragedWidhtInPercent)/100);
        // @ts-ignore
        this.props.setValue1( currentMin);
        console.log(e.pageX, e.clientX, offsetSliderWidht);

        console.log(currentMin , (currentMax-minValueBetween));

        console.log((max * dragedWidhtInPercent)/100);

        if( (currentMin >= min) && (currentMin <= (currentMax-minValueBetween))){
            this.minValue.style.width = dragedWidhtInPercent + "%";
            this.minValue.dataset.content = currentMin;

            this.setState({
                currentMin,
                inputMin: currentMin
            })
        }
    }

    onMouseUpMin = () => {
        document.removeEventListener('mouseup', this.onMouseUpMin);
        document.removeEventListener('mousemove', this.onMouseMoveMin);

        document.removeEventListener('touchend', this.onMouseMoveMin);
        document.removeEventListener('touchmove', this.onMouseUpMin);
    }

    setMax = (e:ChangeEvent<HTMLInputElement>) => {
        const { min, max, currentMin, currentMax, minValueBetween } = this.state;

        const inputMax = e.target.value;

        this.setState({
            inputMax
        });

        if((+inputMax >= currentMin + minValueBetween) && (+inputMax <= max)){

            this.setState({
                currentMax: parseInt(inputMax)
            });
            this.maxValue.style.width = (+inputMax*100)/max + "%";
        }

    }

    changeMaxValue = (e:any) => {
        e.preventDefault();

        document.addEventListener('mousemove', this.onMouseMoveMax);
        document.addEventListener('mouseup', this.onMouseUpMax);

        document.addEventListener('touchmove', this.onMouseMoveMax);
        document.addEventListener('touchend', this.onMouseUpMax);
    }

    onMouseMoveMax = (e:any) => {
        const { max, currentMin, minValueBetween, sliderWidth, offsetSliderWidht} = this.state;
        const maxWalueThumb = this.maxValue;
        const dragedWidht = e.clientX - offsetSliderWidht;
        const dragedWidhtInPercent = (dragedWidht*100)/sliderWidth;
        const currentMax = Math.abs(((max * dragedWidhtInPercent)/100));
        // @ts-ignore
        this.props.setValue2( currentMax);
        if( (currentMax >= (currentMin + minValueBetween)) && (currentMax <= max)){

            maxWalueThumb.style.width = dragedWidhtInPercent + "%";
            maxWalueThumb.dataset.content = currentMax;
            this.setState({
                currentMax,
                inputMax: currentMax
            })
        }
    }

    onMouseUpMax = () => {
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mousemove', this.onMouseMoveMax);

        document.removeEventListener('touchend', this.onMouseUp);
        document.removeEventListener('touchmove', this.onMouseMoveMax);
    }

    maxForMin = () => {
        const { currentMax, minValueBetween} = this.state;
        if(currentMax)return currentMax - minValueBetween;
    }

    minForMax = () => {
        const { currentMin, minValueBetween} = this.state;
        if(currentMin) return currentMin + minValueBetween;
        else return 0
    }

    render() {
        const { min, max, currentMin, inputMin, currentMax, inputMax, minValueBetween } = this.state;

        return (
            <div className="card">
                <h2>Double range slider</h2>
                <div className="current-value">
                    <label htmlFor="min-input">Min: </label>
                    <input
                        id="min-input"
                        type="number"
                        onChange={this.setMin}
                        value={inputMin}
                        min={min}
                        max={this.maxForMin()}
                    />

                    <br/>
                    <label htmlFor="max-input">Max: </label>
                    <input
                        id="max-input"
                        type="number"
                        onChange={this.setMax}
                        value={inputMax}
                        min={this.minForMax()}
                        max={max}/>

                </div>

                <div className="values">
                    <div>{ min }</div>
                    <div>{ max }</div>
                </div>

                <div ref={ref => this.slider = ref} id="slider">

                    <div ref={ref => this.minValue = ref} id="min" data-content={currentMin}>
                        <div ref={ref => this.minValueDrag = ref} id="min-drag" onMouseDown ={this.changeMinValue} onTouchStart={this.changeMinValue}></div>
                    </div>

                    <div ref={ref => this.maxValue = ref} id="max" data-content={currentMax}>
                        <div ref={ref => this.maxValueDrag = ref} id="max-drag" onMouseDown={this.changeMaxValue} onTouchStart={this.changeMaxValue}></div>
                    </div>

                </div>
            </div>
        )
    }
}
