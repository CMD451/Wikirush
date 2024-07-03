import React from 'react';
import { useEffect, useState, useRef } from "react";
import { JoinForm } from './JoinForm';
import { LobbyView } from '../lobbyView/LobbyView';
import { genereateRandomLobbyId } from '../../util/genereateRandomLobbyId';


export const UserContext = React.createContext({
    user: null,
});


export function JoinLobbyView() {
    const lobbyUri = useRef(null)
    const [user, setUser] = useState({})
    const [joined, setJoined] = useState(false)
    const [error,setError] = useState(null)


    useEffect(()=>{
        if(window.location.pathname.replace("/","").length <= 0){
            const newUri = genereateRandomLobbyId()
            lobbyUri.current = newUri
            window.history.replaceState({}, '', new URL(newUri,window.location.href));
        }
    },[])

    function OnJoinLobby() {
        //validate
        //if valid
        if((!user.username)||(user.username.length > 15)||(user.username.length < 3)){
            setError("Invalid username")
            return
        }
        if(lobbyUri.current === null || lobbyUri.current.length <= 0){
            lobbyUri.current = window.location.pathname.replace("/","");
        }
        setUser(user)
        setJoined(true);
    }
    function generateContent() {
        if (joined) {
            return (
                <UserContext.Provider value={{ user, setUser }}>
                    <LobbyView uri={lobbyUri.current}/>
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

