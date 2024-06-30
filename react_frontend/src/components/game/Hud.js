import React from 'react';
import { useEffect, useState } from "react";
import '../../styles/hud.css'
import { Timer } from './Timer';

export function Hud(props) {
   

    useEffect(()=>{
       
    },[])

    return (
        <div className='hud-container'>
            <p>
                <h3>Goal: {props.endArticle}</h3>   
            </p>
            <p>
                <Timer startTime={props.startTime} running={!props.isLoading} onTimeChange={props.onTimeChange}/>
            </p>
        </div>
    );

}

