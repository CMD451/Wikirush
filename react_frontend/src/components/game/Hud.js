import React from 'react';
import { useEffect, useState } from "react";
import '../../styles/hud.css'

export function Hud(props) {

    useEffect(()=>{
       
    },[])

    return (
        <div className='hud-container'>
            <p>
                Goal:{props.endArticle}
            </p>
        </div>
    );







}

