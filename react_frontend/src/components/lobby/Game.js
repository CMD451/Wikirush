import React from 'react';
import { useEffect, useState,useRef } from "react";
import { Wikipage } from '../game/Wikipage';
import { Hud } from '../game/Hud';

export function Game(props) {
    const [currentUrl,setCurrentUrl] = useState(props.startUrl);
    const userTime = useRef(0.00)

    function onUrlChange(url){
        if(url == props.endArticle){
            alert("!!!")
        }
        setCurrentUrl(url);
        props.onPageVisit(url,userTime.current)
    }

    function onTimeChange(newTime){
        userTime.current = newTime;
    }
    return (
        
        <div className='game-container'>
            <Hud endArticle={props.endArticle}  startTime={userTime}  onTimeChange={onTimeChange}/>
            <div className='wikipage-container'>
                <Wikipage lang={props.lang} page={currentUrl} onUrlChange={onUrlChange}/>
            </div>
        </div>
    );
}

