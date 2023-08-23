import React from 'react';
import { useEffect, useState,useRef } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { UserContext } from '../Hub.js/Hub';
import WebSocketInstance from '../../websocket/websocket';
import { PlayerList } from '../lobby/PlayerList'
import '../../styles/game.css'


export function LobbyView(props) {
    const { user, setUser } = React.useContext(UserContext);
    const [players, setPlayers] = useState([]);
    const [currentUser,setCurrentUser] = useState(user)
    let isFirstRender = useRef(true);

    function setCallbacks() {
        WebSocketInstance.setOnOpenCallback(() => {
            WebSocketInstance.sendMessage(
                {
                    action: "user_join",
                    member: user
                }
            )
        })
        WebSocketInstance.setOnMessageCallback((data) => {
            switch (data['action']) {
                case "user_first_connection":
                    setCurrentUser(data['content'])
                    break;
                case "user_join":
                    setPlayers(players => [...players, data['member']])
                    break;
                case "fetch_members":
                    setPlayers(data['content'].filter(member => (member.pk != currentUser.pk)))
                    break;
                case "user_left":
                    setPlayers(players.filter((member)=>(member.pk != data['content'].pk)))
                    break;
            }   

        })
    }

    useEffect(() => {
        setCallbacks();
    })
    useEffect(()=>{
        WebSocketInstance.connect("test");
    },[])
    useEffect(() =>{
        if(isFirstRender){
            isFirstRender = false
            return
        }
        WebSocketInstance.sendMessage({
            action:"fetch_members",
            message:"package"
        })

    },[currentUser])
    function GO(e){
        WebSocketInstance.sendMessage({
            action:'fetch_members'
        })
    }
    return (
        <main>
            <div className="main-container">
                <div className="settings-container flex">
                    <div className="start-options flex-horizontal">
                        <div className="buttons-container">
                            <button onClick={GO}>Ropocznij</button>
                            <button>Zaproś</button>
                        </div>
                    </div>
                    <div className="settings box-shadow">

                    </div>

                </div>
            <PlayerList players={players} currentPlayer={currentUser}/>
        </div>

    </main >
    );
}

