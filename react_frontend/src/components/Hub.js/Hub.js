import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { LobbyView } from '../lobby/LobbyView';
import { generateId } from '../../util/generateId';


export const UserContext = React.createContext({
    user: null,
    setUser: () => { }
});


export function Hub() {
    const [lobbyUri,setLobbyUri] = useState(null)
    const [user, setUser] = useState({})
    const [joined, setJoined] = useState(false)


    function OnJoinLobby() {
        //validate
        //if valid
        let uri = window.location.pathname.replace("/","")
        if (uri.length > 0) {
            setLobbyUri(uri);
        }
        let newUser = user
        newUser['id'] =  generateId(user['username']);
        setUser(newUser)
        setJoined(true);
    }
    function generateContent() {
        console.log(joined)
        if (joined) {
            return (
                <UserContext.Provider value={{ user, setUser }}>
                    <LobbyView uri={lobbyUri}/>
                </UserContext.Provider>
            )
        }
        return (<JoinLobbyView onChange={setUser} onJoin={OnJoinLobby} />)
    }
    return (
        <React.Fragment>
            {generateContent()}
        </React.Fragment>
    );
}

