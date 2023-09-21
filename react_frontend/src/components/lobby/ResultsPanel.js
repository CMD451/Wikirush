import React from 'react';
import { useEffect, useState } from "react";
import { PlayerResults } from './PlayerResults';

export function ResultsPanel(props) {
    function generateResults() {
        if (props.results === null) {
            return ("")
        }
        console.log(props.results)
        return props.results.map((member, index) => {
            return (<PlayerResults player={member} index={index} />)
        })

    }

    return (
        <div className='flex-horizontal box-shadow'>
            <table className='result-table'>
                {generateResults()}
            </table>
        </div>

    );
}

