import React from 'react';
import { useEffect, useState,useRef } from "react";
import { formatTime } from './util/formatTime';


export function Timer(props) {
    const [currentTime, setCurrentTime] = useState(0);
    const startTime = useRef(Date.now)
    useEffect(()=>{
       let interval = setInterval(()=>{
       if (props.running){
            setCurrentTime(n => n + 100);   
       } 
       },100)

       return () => clearInterval(interval);

    },[props])

    useEffect(()=>{
        props.onTimeChange(currentTime);
    },[currentTime])

    return (
       <React.Fragment>
            <h2>{formatTime(currentTime)}</h2>
       </React.Fragment>
    );







}

