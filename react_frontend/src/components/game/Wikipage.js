import React from 'react';
import { useEffect, useState } from "react";
import { FullScreenLoading } from '../util/FullScreenLoading';
import { wikipageRequest } from '../../lookup/lookup';
import '../../styles/wikipedia.css'
const interceptClicks = require('intercept-link-clicks')

export function Wikipage(props) {
    const [loading,setLoading] = useState(true)
    const [content,setContent] = useState(null)


    useEffect(()=>{
        interceptClicks((e, el) => {
            e.preventDefault()
            if('onUrlChange' in props){
                props.onUrlChange(el.getAttribute('href').split('/')[2])
            }
          });
    },[])


    useEffect(()=>{
        wikipageRequest(props.page,props.lang)
        .then((response => {
            const status = response.status
            if(status == 200){
                setContent(response.body.parse.text['*'])
                //temporary test
                let head = document.getElementsByTagName("head")[0]
                let headC = response.body.parse.headhtml['*'].replaceAll(`\"/w/load.php?`,`\"https://en.wikipedia.org/w/load.php?`)
                head.innerHTML += headC + "<style>body{   background-color: #ffffff !important; color:black !important;} h2{border-bottom: 1px solid #a2a9b1 !important; padding:1em;} </style>"
                setLoading(false)
            }
        }))
    },[props])




    return (
        <React.Fragment>
            {loading ? (<FullScreenLoading/>) :  (<div id='bodyContent' className='vector-body ve-init-mw-desktopArticleTarget-targetContainer' aria-labelledby='firstHeading ' data-mw-ve-target-container dangerouslySetInnerHTML={{ __html: content }}/>)}
        </React.Fragment>
    );







}
