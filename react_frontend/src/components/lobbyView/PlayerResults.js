import React from 'react';
import { useEffect, useState } from "react";
import { formatTime } from '../../util/formatTime';
export function PlayerResults(props) {
    const [showVisitedPages, setShowVisitedPages] = useState(false)
    //in props player, index
    function generateVisitedPages() {
        if (!showVisitedPages) return ("");

        let pages = props.player.visitedPages
        pages = pages.map((page) => {
            return (
                <tr>
                    <td></td>
                    <td></td>
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
            <React.Fragment>
                {pages}
            </React.Fragment>
        )

    }
    console.log(props)
    return (
        <React.Fragment>
            <tr>
                <th>
                    {props.index + 1}
                </th>
                <th>
                    <img src={props.player['avatarUrl']} className='result-table-img' />
                </th>
                <th>
                    {props.player['username']}
                </th>
                <th>
                    {formatTime(props.player['score'])}
                </th>
                <th>
                    <button onClick={() => { setShowVisitedPages(n => !n) }} >{showVisitedPages ? "Hide" : "Show"}</button>
                </th>
            </tr>
            {generateVisitedPages()}
            <span className='results-row-end' />
        </React.Fragment>
    );
}

