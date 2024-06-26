import React from 'react';
import { useEffect, useState,useRef } from "react";
import { Wikipage } from '../game/Wikipage';
import { Hud } from '../game/Hud';
import { ArticlePlayerList } from '../game/ArticlePlayerList';



export function Game(props) {
    const [currentUrl,setCurrentUrl] = useState(props.startUrl);
    const [pageLoading,setPageLoading] = useState(false)
    const userTime = useRef(0.00)
    function onUrlChange(url){
        setCurrentUrl(url);
        if(url == props.endArticle){
            props.onGoalReached(url,userTime.current)
            return
        }
        props.onPageVisit(url,userTime.current)
    }

    function onTimeChange(newTime){
        userTime.current = newTime;
    }

    return (
        
        <div className='game-container'>
            <Hud endArticle={props.endArticle}  startTime={userTime}  onTimeChange={onTimeChange} isLoading={pageLoading}/>
            <div className='game-content-container'>
                <div className='player-article-container'>
                    <ArticlePlayerList players={props.players}/>
                </div>
                <div className='wikipage-container'>
                    <Wikipage lang={props.lang} page={currentUrl} onUrlChange={onUrlChange} isLoading={pageLoading} onLoading={setPageLoading}/>
                </div>
            </div>
            
        </div>
    );
}

