import React from 'react';
import { useEffect, useState } from "react";
import { FullScreenLoading } from '../util/FullScreenLoading';
import { wikipageRequest } from '../../lookup/lookup';
import '../../styles/wikipedia.css'
const interceptClicks = require('intercept-link-clicks')

export function Wikipage(props) {
    const [content, setContent] = useState(null)


    useEffect(() => {
        interceptClicks((e, el) => {
            e.preventDefault()
            if ('onUrlChange' in props) {
                props.onUrlChange(el.getAttribute('href').split('/')[2])
            }
        });
    }, [])


    useEffect(() => {
        props.onLoading(true)
        wikipageRequest(props.page, props.lang)
            .then((response => {
                const status = response.status
                if (status == 200) {
                    setContent(response.body.parse.text['*'])
                    //temporary test
                    let head = document.getElementsByTagName("head")[0]
                    let headC = response.body.parse.headhtml['*'].replaceAll(`\"/w/load.php?`, `\"https://en.wikipedia.org/w/load.php?`)
                    head.innerHTML += headC + "<style>body{   background-color: #ffffff !important; color:black !important;} h2{border-bottom: 1px solid #a2a9b1 !important; padding:1em;} </style>"
                    props.onLoading(false)
                }
            }))
    }, [props.page,props.lang,props.setPageLoading])




    return (
        <React.Fragment>
            {props.isLoading ? (<FullScreenLoading />) :
                (<React.Fragment>
                    <h2>{props.page}</h2>
                    <div id='bodyContent' aria-labelledby='firstHeading ' data-mw-ve-target-container dangerouslySetInnerHTML={{ __html: content }} />
                </React.Fragment>)}
        </React.Fragment>
    );







}

