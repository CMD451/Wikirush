import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';


export function Game(props) {
    let iframeW = React.createRef();
   
    function handleStuff(e){
        console.log(iframeW)
        console.log("ua")
        //console.log(iframeW.window.locatio)
        console.log(iframeW.current.url)
        console.log(iframeW.current.contentWindow.location)
        console.log(iframeW.current.accessKey)
    }

    return (
        <React.Fragment>

        <button onClick={handleStuff}> do stuff</button>
        <iframe ref={iframeW} onLoad={alert("HALO GALO")} src="https://pl.wikipedia.org/wiki/Przyj%C4%99cie" width="100%" title="W3Schools Free Online Web Tutorials"  ></iframe>

        </React.Fragment>
    ); 







}

