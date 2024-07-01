import React from 'react';
import { useEffect, useState,useRef } from "react";


export function useTimer(isRunning,step) {
    const [currentTime, setCurrentTime] = useState(0);
    const startTime = useRef(Date.now)
    useEffect(()=>{
       let interval = setInterval(()=>{
       if (isRunning){
            setCurrentTime(n => n + step);   
       } 
       },step)

       return () => clearInterval(interval);

    },[isRunning,step])

   return currentTime;


}