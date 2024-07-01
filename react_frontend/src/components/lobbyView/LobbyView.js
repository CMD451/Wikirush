import React from 'react';
import { useEffect, useState, useRef } from "react";
import { UserContext } from '../joinView/JoinLobbyView';
import WebSocketInstance from '../../websocket/websocket';
import { PlayerList } from './PlayerList'
import { SettingsPanel } from './settingsForm/SettingsPanel';
import { ResultsPanel } from './ResultsPanel';
import { FullScreenLoading } from '../../util/FullScreenLoading';
import { LobbyUnavailable } from './LobbyUnavailable';
import { Game } from '../gameView/Game';
import '../../styles/game.css'
import { WaitForEnd } from './WaitForEnd';


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
        endArticle: "Pet",
        lang: "en",
        endTimer:30
    })
    const isOwner = ownerPk == currentUser.pk
    let isFirstRender = useRef(true);

    function handleSettingsChange(newSettings) {
        //maybe update owner settings directly with newSettings
        setSettings({...settings,...newSettings})
        WebSocketInstance.sendMessage(
            {
                action: "settings_change",
                content: newSettings,
                owner_token: ownerToken,
            }
        )
    }
    
    function onGoalArticleReached(articleName, userTime){
        sendGoalReachedAction(articleName,userTime);
        setCurrentContent("waitingForEnd")
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
            <Game endArticle={settings['endArticle']} players={players}  startUrl={settings['startArticle']}
                onPageVisit={sendPageVisitAction} onGoalReached={onGoalArticleReached} lang={settings['lang']} />
        ),
        unavailable: (
            <LobbyUnavailable />
        ),
        waitingForEnd:(
            <WaitForEnd endTime={settings.endTimer} />
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
                    setPlayers(players.map((player)=>{
                        player['current_article'] = settings.startArticle
                        return player
                    }))
                    setCurrentContent("game")
                    break;
                case 'player_page_visit':
                    console.log("Player visit")
                    let players_copy = [...players]
                    let player_index = players_copy.findIndex((player)=>player.pk == data['content']['member'])
                    players_copy[player_index]['current_article'] = data['content']['article']
                    setPlayers(players_copy)
                    console.log(players)
                    break;
                case 'settings_change':
                    if(currentUser.pk != ownerPk)  setSettings(data['content']);
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
                    console.log(data['content'])
                    let resultData = data['content']['members'].map((member) => {
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
                    console.log(resultData)
                    resultData.sort((a, b) => {
                        if (a['score'] > b['score']) {
                            return 1;
                        }
                        else if (b['score'] > a['score']) {
                            return -1;
                        }
                        return 0
                    })
                    setResults(data['content']['members'])
                    console.log()
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

