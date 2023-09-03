import React from 'react';
import { useEffect, useState } from "react";

export function Timer(props) {

    const [currentTime, setCurrentTime] = useState(0);
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
            <h2>{(currentTime)/1000 }</h2>
       </React.Fragment>
    );







}

