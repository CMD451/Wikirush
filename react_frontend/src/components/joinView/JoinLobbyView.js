import React from 'react';
import { useEffect, useState } from "react";
import { JoinForm } from './JoinForm';
import { LobbyView } from '../lobbyView/LobbyView';
import { generateId } from '../../util/generateId';


export const UserContext = React.createContext({
    user: null,
});


export function JoinLobbyView() {
    const [lobbyUri,setLobbyUri] = useState(null)
    const [user, setUser] = useState({})
    const [joined, setJoined] = useState(false)
    const [error,setError] = useState(null)


    function OnJoinLobby() {
        //validate
        //if valid
        if((!user.username)||(user.username.length > 15)||(user.username.length < 3)){
            setError("Invalid username")
            return
        }
        let uri = window.location.pathname.replace("/","")
        if (uri.length > 0) {
            console.log(uri)
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
        return (<JoinForm onChange={setUser} onJoin={OnJoinLobby} error={error}/>)
    }
    return (
        <React.Fragment>
            {generateContent()}
        </React.Fragment>
    );
}

