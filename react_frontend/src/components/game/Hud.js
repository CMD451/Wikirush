import React from 'react';
import { useEffect, useState } from "react";
import '../../styles/hud.css'
import { Timer } from './Timer';

export function Hud(props) {
    const [running,setRunning] = useState(true)


    useEffect(()=>{
       
    },[])

    return (
        <div className='hud-container'>
            <p>
                Goal:{props.endArticle}
            </p>
            <button onClick={(e)=>{console.log(running);setRunning(n => !n)}}>
                Start/Stop
            </button>
            <p>
                Time: <Timer startTime={props.startTime} running={running} onTimeChange={props.onTimeChange}/>
            </p>
        </div>
    );

}

