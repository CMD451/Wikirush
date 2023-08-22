import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { UserContext } from '../Hub.js/Hub';
import WebSocketInstance from '../../websocket/websocket';
import { PlayerList } from '../lobby/PlayerList'
import '../../styles/game.css'


export function LobbyView(props) {
    const { user, setUser } = React.useContext(UserContext);
    const [players, setPlayers] = useState(new Array())

    function setCallbacks() {
        WebSocketInstance.setOnOpenCallback(() => {
            console.log("Connected to websocket!")
            console.log("Sending message")
            WebSocketInstance.sendMessage(
                {
                    action: "user_join",
                    member: user
                }
            )

        })
        WebSocketInstance.setOnMessageCallback((data) => {
            switch (data['action']) {
                case "user_join":
                    console.log("someone joined")
                    console.log(data)
                    setPlayers(players => [...players, data['member']])
            }
        })
    }

    useEffect(() => {
        setCallbacks();
        WebSocketInstance.connect("blablabla");

    }, [])
    return (
        <main>
            <div className="main-container">
                <div className="settings-container flex">
                    <div className="start-options flex-horizontal">
                        <div className="buttons-container">
                            <button>Ropocznij</button>
                            <button>Zaproś</button>
                        </div>
                    </div>
                    <div className="settings box-shadow">

                    </div>

                </div>
            <PlayerList players={players}/>
        </div>

    </main >
    );
}

