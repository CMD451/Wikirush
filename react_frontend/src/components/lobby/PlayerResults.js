import React from 'react';
import { useEffect, useState } from "react";
import { formatTime } from '../game/util/formatTime';
export function PlayerResults(props) {
    const [showVisitedPages,setShowVisitedPages] = useState(false)
    //in props player, index
    function generateVisitedPages(){
        if(!showVisitedPages) return ("");

        let pages = props.player.visitedPages
        pages = pages.map((page)=>{
            return (
                <tr>
                    <td>
                        {page.article}
                    </td>
                    <td>
                        {formatTime(page.time)}
                    </td>
                </tr>
            )
        })
        return (
            <table>
                {pages}
            </table>
        )

    }
    console.log(props)
    return (
        <tr>
            <td>
                {props.index + 1}
            </td>
            <td>
                {props.player['username']}
            </td>
            <td>
                {formatTime(props.player['score'])}
            </td>
            <td>
                <button onClick={()=>{setShowVisitedPages(n=>!n)}} >{showVisitedPages ? "Hide" : "Show"}</button>
            </td>
            {generateVisitedPages()}
        </tr>
    );
}

