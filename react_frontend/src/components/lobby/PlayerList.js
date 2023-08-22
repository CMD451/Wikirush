import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';

export function PlayerList(props) {
    function generatePlayersContainers() {
        if (!'players' in props) {
            return
        }
        console.log(props.players)
        let playersArray = props.players.map(player => {
            console.log(player)
            return (
                <div className="single-player-container flex">
                    <div className="avatar">
                        <img src={player['avatarUrl']}/>
                    </div>
                    <div className="username">
                        <p>{player['username']}</p>
                    </div>
                </div>
            )
        });
        console.log(playersArray)
        return playersArray
    }
    return (
        <div className="player-list-container flex-horizontal box-shadow">
            {generatePlayersContainers()}
        </div>
    );
}

