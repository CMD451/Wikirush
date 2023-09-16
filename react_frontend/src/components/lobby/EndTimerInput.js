import React from 'react';
import { useEffect, useState } from "react";


export function EndTimerInput(props) {
    function handleOnChange(e){
        let value = e.target.value
        if((value.isInteger())&&(value >= 0)){
            props.onChange(e.target.value)
        }   
    }
    return (

        <React.Fragment>
            <input disabled={props.isDisabled} value={props.value} onChange={handleOnChange} type='number' min={0}/>
        </React.Fragment>

    );
}

