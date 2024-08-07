import React from 'react';
import { useState,useRef } from "react";
import { Wikipage } from './Wikipage';
import { Hud } from './Hud';
import { ArticlePlayerList } from './ArticlePlayerList';



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
        <div className='main-game-container'>
          <div className='player-article-container'>
            <ArticlePlayerList players={props.players}/>
            </div>
            <div className='game-container'>
                <Hud endArticle={props.endArticle} onTimeChange={onTimeChange} isLoading={pageLoading} time={userTime}/>
                <div className='wikipage-container'>
                    <Wikipage lang={props.lang} page={currentUrl} onUrlChange={onUrlChange} isLoading={pageLoading} onLoading={setPageLoading}/>
                </div>
            </div>
        </div>
    );
}

