import React from 'react';
import { useEffect, useState } from "react";
import { PlayerResults } from './PlayerResults';

export function ResultsPanel(props) {
    function generateResults(){
        if(props.results === null){
            return ("")
        }

        return props.results.map((index,member)=>{
            return (<PlayerResults player={member} index={index} />)
        })

    }

    return (
        <table>
            {generateResults()}
        </table>
    );
}

