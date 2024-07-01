import React from 'react';
import { useTimer } from '../../util/useTimer';
import { formatTime } from '../../util/formatTime';

export function WaitForEnd(props) {
    const elapsedTime = useTimer(true,100);
    const timeLeft = (props.endTime * 1000) - elapsedTime
    return (
        <div>
            <h1>You have reached the target article. The game will end in:</h1>
            <h2>{formatTime(timeLeft)}</h2>
        </div>
    );
}

