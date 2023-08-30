import React from 'react';
import { useEffect, useState, useRef } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { UserContext } from '../Hub.js/Hub';
import WebSocketInstance from '../../websocket/websocket';
import { PlayerList } from '../lobby/PlayerList'
import { SettingsPanel } from './SettingsPanel';
import {useIsOwner} from './hooks/useIsOwner'
import { Game } from './Game';
import '../../styles/game.css'


export function LobbyView(props) {
    const { user, setUser } = React.useContext(UserContext);
    const [players, setPlayers] = useState([]);
    const [ownerPk, setOwnerPk] = useState([0]);
    const [ownerToken, setOwnerToken] = useState([""]);
    const [currentUser, setCurrentUser] = useState(user)
    const [settings,setSettings] = useState({
        startArticle:"Pet_door",
        endArticle:"Berlin",
        lang:"en"
    })
    //const [isOwner] = useIsOwner(currentUser,ownerPk)
    let isOwner = ownerPk == currentUser.pk
    let isFirstRender = useRef(true);


    function handleSettingsChange(newSettings){
        //maybe update owner settings directly with newSettings
        WebSocketInstance.sendMessage(
            {
                action:"settings_change",
                content:newSettings,
                owner_token:ownerToken
            }
        )
    }

    const [currentContent, setCurrentContent] = useState("menu")
    let content = {
        menu: (
            <React.Fragment>
                <SettingsPanel settings={settings} onChange={handleSettingsChange} OnStartButtonClick={sendStartGameAction} isOwner={isOwner}   />
                <PlayerList players={players} currentPlayer={currentUser} ownerPk={ownerPk} />
            </React.Fragment>
        ),
        game: (
            <Game endArticle={settings['endArticle']} startUrl={settings['startArticle']}  lang={settings['lang']}/>
        )
    }

    function sendStartGameAction(){
        WebSocketInstance.sendMessage(
            {
                action:"start_game",
                owner_token:ownerToken
            }
        )
    }

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
                    setCurrentUser(data['content']['member'])
                    setOwnerPk(data['content']['owner_pk'])
                    break;
                case "user_join":
                    setPlayers(players => [...players, data['content']])
                    break;
                case "fetch_members":
                    setPlayers(data['content'].filter(member => (member.pk != currentUser.pk)))
                    break;
                case "user_left":
                    setPlayers(players.filter((member) => (member.pk != data['content'].pk)))
                    break;
                case 'owner_update':
                    setOwnerPk(data['content']);
                    break;
                case 'designate_as_owner':
                    setOwnerToken(data['content'])
                    break;
                case 'start_game':
                    alert("Starting the game")
                    setCurrentContent("game")
                    break;
                case 'settings_change':
                    setSettings(data['content'])

            }
        })
    }

    useEffect(() => {
        setCallbacks();
    })
    useEffect(() => {
        WebSocketInstance.connect("chledb22");
    }, [])
    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false
            return
        }
        WebSocketInstance.sendMessage({
            action: "fetch_members",
            message: "package"
        })

    }, [currentUser])

    return (
        <main>
            <div className="main-container">
                {content[currentContent]}
            </div>

        </main >
    );
}

