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
                Goal:{props.endArticle}
            </p>
            <p>
                Time: <Timer startTime={props.startTime} running={!props.isLoading} onTimeChange={props.onTimeChange} />
            </p>
        </div>
    );

}

