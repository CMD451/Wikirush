import React from 'react';
import { useEffect, useState, useRef } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { UserContext } from '../Hub.js/Hub';
import WebSocketInstance from '../../websocket/websocket';
import { PlayerList } from '../lobby/PlayerList'
import { SettingsPanel } from './SettingsPanel';
import { ResultsPanel } from './ResultsPanel';
import { useIsOwner } from './hooks/useIsOwner'
import { FullScreenLoading } from '../util/FullScreenLoading';
import { LobbyUnavailable } from './LobbyUnavailable';
import { Game } from './Game';
import '../../styles/game.css'


export function LobbyView(props) {
    const { user, setUser } = React.useContext(UserContext);
    const [players, setPlayers] = useState([]);
    //change ownerPk,ownerToken to ref
    const [ownerPk, setOwnerPk] = useState([0]);
    const [ownerToken, setOwnerToken] = useState([""]);
    const [results, setResults] = useState(null)

    const [currentUser, setCurrentUser] = useState(user)
    const [settings, setSettings] = useState({
        startArticle: "Pet_door",
        endArticle: "Berlin",
        lang: "en",
        endTimer:30
    })
    //const [isOwner] = useIsOwner(currentUser,ownerPk)
    let isOwner = ownerPk == currentUser.pk
    let isFirstRender = useRef(true);


    function handleSettingsChange(newSettings) {
        //maybe update owner settings directly with newSettings
        WebSocketInstance.sendMessage(
            {
                action: "settings_change",
                content: newSettings,
                owner_token: ownerToken,
            }
        )
    }

    const [currentContent, setCurrentContent] = useState("loading")
    let content = {
        menu: (
            <React.Fragment>
                <SettingsPanel settings={settings} onChange={handleSettingsChange} OnStartButtonClick={sendStartGameAction} isOwner={isOwner} />
                <PlayerList players={players} currentPlayer={currentUser} ownerPk={ownerPk} />
            </React.Fragment>
        ),
        game: (
            <Game endArticle={settings['endArticle']} startUrl={settings['startArticle']} onPageVisit={sendPageVisitAction} onGoalReached={sendGoalReachedAction} lang={settings['lang']} />
        ),
        unavailable: (
            <LobbyUnavailable />
        ),
        loading: (
            <FullScreenLoading />
        ),
        results: (
            <React.Fragment>
                <ResultsPanel results={results} />
                <PlayerList players={players} currentPlayer={currentUser} ownerPk={ownerPk} />
            </React.Fragment>
        )
    }

    function sendStartGameAction() {
        WebSocketInstance.sendMessage(
            {
                action: "start_game",
                owner_token: ownerToken
            }
        )
    }
    function sendPageVisitAction(articleName, userTime) {
        WebSocketInstance.sendMessage(
            {
                action: "page_visit",
                content: {
                    article: articleName,
                    time: userTime

                }
            }
        )
    }
    function sendGoalReachedAction(articleName, userTime) {
        WebSocketInstance.sendMessage(
            {
                action: "end_article_reached",
                content: {
                    article: articleName,
                    time: userTime
                }
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
                    setCurrentContent("menu")
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
                    break;
                case 'lobby_unavailable':
                    WebSocketInstance.disconnect()
                    setCurrentContent('unavailable')
                    break;
                case 'end_article_reached':
                    if (data['content'] != currentUser.pk) {
                        alert("End article reached")
                    }
                    break;
                case 'end_game':
                    console.log(data);
                    resultData = data['content']['members'].map((member) => {
                        let score = NaN
                        member['visitedPages'].every(page => {
                            if (page['article'] == settings['endArticle']) {
                                score = page['time']
                                return false
                            }
                            return true
                        });
                        member['score'] = score
                    })

                    resultData.sort((a, b) => {
                        if (a['score'] > b['score']) {
                            return 1;
                        }
                        else if (b['score'] > a['score']) {
                            return -1;
                        }
                        return 0
                    })

                    setResults(resultData)
                    setCurrentContent('results')
                    break;

            }
        })
    }

    useEffect(() => {
        setCallbacks();
    })
    useEffect(() => {
        WebSocketInstance.connect(props.uri);
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

