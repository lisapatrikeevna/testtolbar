import React, {ChangeEvent, useState, KeyboardEvent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import cl from './Sort.module.css';
import {sortTypeAC} from "../../../redux/productReducer";
import {RootStateType} from "../../../redux/store";

type ItemType = {
    title: string
    value: any
}
type SelectType = {
    items: ItemType[]
}
export const Sort = (props:SelectType) => {
    const dispatch = useDispatch()
    let value = useSelector<RootStateType,string>(state => state.products.sort)
    const [active, setActive] = useState(false);
    const [hoverEL, setHoverEL] = useState(value);
    const onChange =(value:string)=>{
        dispatch(sortTypeAC(value))
    }
    const selectedItem = props.items.find(i => i.value === value)
    const hoveredItem = props.items.find(i => i.value === hoverEL)

    useEffect(() => {
        setHoverEL(value);
    }, [value])

    const showActive = () => { setActive(!active) }
    const itemClicked = (value: any) => {
        onChange(value);
        showActive();
    }
    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            for (let i = 0; i < props.items.length; i++) {
                if (props.items[i].value === hoverEL) {
                    const pretendentElement = e.key === 'ArrowDown' ? props.items[i + 1] : props.items[i - 1];
                    if (pretendentElement) {
                        onChange(pretendentElement.value)
                        setHoverEL(props.items[i+1].value);
                        return;
                    }
                }
            }
            if (!selectedItem) {
                onChange(props.items[0].value);
            }
        }
        if (e.key === 'Enter' || e.key === 'Escape') {
            setActive(false);
        }
    }

    return (
        <div  className={cl.select} onKeyUp={onKeyUp} tabIndex={0}>
            <h3 onClick={showActive} className={cl.mainTitle}>{selectedItem && selectedItem.title}</h3>
            {active &&
            <div className={cl.items}>
                {props.items.map(i =>
                    <div key={i.value}
                         onMouseEnter={() => { setHoverEL(i.value) }}
                         onClick={() => {  itemClicked(i.value) }}
                         className={cl.item + (hoveredItem === i ? cl.selected : '')} >
                        {i.title}
                    </div>)}
            </div>
            }
        </div>
    )
}