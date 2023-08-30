import React from 'react';
import { useEffect, useState } from "react";
import { Wikipage } from '../game/Wikipage';
import { Hud } from '../game/Hud';

export function Game(props) {
    const [currentUrl,setCurrentUrl] = useState(props.startUrl);

    function onUrlChange(url){
        if(url == props.endArticle){
            alert("!!!")
        }
        setCurrentUrl(url);
    }

    return (
        
        <div className='game-container'>
            <Hud endArticle={props.endArticle}/>
            <div className='wikipage-container'>
                <Wikipage lang={props.lang} page={currentUrl} onUrlChange={onUrlChange}/>
            </div>
        </div>
    );
}

