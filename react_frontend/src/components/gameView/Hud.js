import React from 'react';
import { useEffect } from "react";
import '../../styles/hud.css'
import { formatTime } from '../../util/formatTime';
import { useTimer } from '../../util/useTimer';

export function Hud(props) {
    const time = useTimer(!props.pageLoading,100)

    useEffect(()=>{
       props.onTimeChange(time)
    },[time])

    return (
        <div className='hud-container'>
            <p>
                <h3>Goal: {props.endArticle}</h3>   
            </p>
            <p>
                <h2>{formatTime(time)}</h2>
            </p>
        </div>
    );

}

