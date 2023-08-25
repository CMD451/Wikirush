import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';

export function PlayerList(props) {
    function generatePlayersContainers() {
        if (!'players' in props) {
            return
        }
        let playersArray = props.players.map(player => {
            let usernameStyle = "username"
            if(('currentPlayer' in props)&&(props.currentPlayer.pk == player.pk)){
                usernameStyle+=" current-player"
            }
            if(('ownerPk' in props)&&(props.ownerPk == player.pk)){
                usernameStyle+= " lobby-owner"
            }
            return (
                <div className="single-player-container flex">
                    <div className="avatar">
                        <img src={player['avatarUrl']}/>
                    </div>
                    <div className={usernameStyle}>
                        <p>{player['username']}  </p>
                    </div>
                </div>
            )
        });
        return playersArray
    }
    return (
        <div className="player-list-container flex-horizontal box-shadow">
            {generatePlayersContainers()}
        </div>
    );
}

