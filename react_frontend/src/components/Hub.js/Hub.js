import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { LobbyView } from '../lobby/LobbyView';
import { generateId } from '../../util/generateId';


export const UserContext = React.createContext({
    user: null,
});


export function Hub() {
    const [lobbyUri,setLobbyUri] = useState(null)
    const [user, setUser] = useState({})
    const [joined, setJoined] = useState(false)
    const [error,setError] = useState(null)


    function OnJoinLobby() {
        //validate
        //if valid
        if((!user.username)||(user.username.length > 15)){
            setError("Invalid username")
            return
        }
        let uri = window.location.pathname.replace("/","")
        if (uri.length > 0) {
            setLobbyUri(uri);
        }
        setUser(user)
        setJoined(true);
    }
    function generateContent() {
        if (joined) {
            return (
                <UserContext.Provider value={{ user, setUser }}>
                    <LobbyView uri={lobbyUri}/>
                </UserContext.Provider>
            )
        }
        return (<JoinLobbyView onChange={setUser} onJoin={OnJoinLobby} error={error}/>)
    }
    return (
        <React.Fragment>
            {generateContent()}
        </React.Fragment>
    );
}

