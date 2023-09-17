import React from 'react';
import { useEffect, useState } from "react";
export function PlayerResults(props) {
    const [showVisitedPages,setShowVisitedPages] = useState(false)
    //in props player, index
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
                {props.player['score']}
            </td>
        </tr>
    );
}

